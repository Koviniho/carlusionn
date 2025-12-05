const paginAndFilter = async (model, queryParams) => {
  try {
    const page = Number(queryParams.page) || 1;
    const limit = queryParams.limit ? Number(queryParams.limit) : 0; // Show all if limit is not provided
    const skip = (page - 1) * limit;

    // Extract filter parameters from queryParams
    const filters = {};

    // Handle price range filter
    if (queryParams.minPrice || queryParams.maxPrice) {
      filters.price = {};
      if (queryParams.minPrice) {
        filters.price.$gte = Number(queryParams.minPrice);
      }
      if (queryParams.maxPrice) {
        filters.price.$lte = Number(queryParams.maxPrice);
      }
    }

    // Handle power range filter
    if (queryParams.minPower || queryParams.maxPower) {
      filters.power = {};
      if (queryParams.minPower) {
        filters.power.$gte = Number(queryParams.minPower.replace('kW', '000').replace('W', ''));
      }
      if (queryParams.maxPower) {
        filters.power.$lte = Number(queryParams.maxPower.replace('kW', '000').replace('W', ''));
      }
    }

    // Handle engine range filter
    if (queryParams.minEngine || queryParams.maxEngine) {
      filters.engine = {};
      if (queryParams.minEngine) {
        filters.engine.$gte = Number(queryParams.minEngine);
      }
      if (queryParams.maxEngine) {
        filters.engine.$lte = Number(queryParams.maxEngine);
      }
    }

    // Add other filters dynamically
    for (const [key, value] of Object.entries(queryParams)) {
      if (
        key !== "page" &&
        key !== "limit" &&
        key !== "search" &&
        key !== "searchFields" &&
        key !== "minPrice" &&
        key !== "maxPrice" &&
        key !== "minPower" &&
        key !== "maxPower" &&
        key !== "minEngine" &&
        key !== "maxEngine" &&
        key !== "populate" &&
        key !== "sort"
      ) {
        if (value) {
          if (Array.isArray(value)) {
            filters[key] = { $in: value };
          } else if (typeof value === 'string') {
            filters[key] = { $in: value.split(",") };
          } else {
            filters[key] = { $in: [value] }; // Handle non-string and non-array values
          }
          
        }
      }
    }

    // Handle search functionality
    if (queryParams?.search) {
      const searchFields = queryParams?.searchFields
        ? queryParams.searchFields.split(",")
        : Object.keys(model.schema.paths);

      filters.$or = searchFields
        .filter((field) => model.schema.paths[field].instance === "String")
        .map((field) => ({
          [field]: { $regex: queryParams.search, $options: "i" },
        }));
    }

    let query = model.find(filters);

    // Apply population if specified
    if (queryParams.populate) {
      const [path, fields] = queryParams.populate.split(':'); // Expect format 'field:field1 field2'
      query = query.populate({
        path, // e.g., 'productAddedBy'
        select: fields // e.g., 'name email'
      });
    }
    

    // Apply sorting if specified
    const sortBy = queryParams.sort || '-createdAt'; // Default to latest products if sort is not specified
    query = query.sort(sortBy);

    // Count total documents matching the filters
    const totalCount = await model.countDocuments(filters);

    // Pagination metadata
    const pagination = {};
    const endIndex = Math.min(skip + limit, totalCount);

    if (endIndex < totalCount) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (skip > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    // Execute query with pagination and sorting
    const results = await query.skip(skip).limit(limit).exec();

    // Return results and pagination metadata
    return {
      totalCount,
      pagination,
      results,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default paginAndFilter;
