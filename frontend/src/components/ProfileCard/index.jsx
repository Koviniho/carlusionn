/* eslint-disable react/prop-types */


function ProfileCard({ image, name, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-80 border border-blue-200 pb-16">
      {/* Image Section */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-500">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Name and Title */}
      <div className="flex justify-center items-center text-center gap-3">
        <span className="h-1 w-4 bg-green-500 rounded-full"></span>
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      </div>

      {/* Divider */}
      <div className=" text-center my-2">
        <p className="text-sm text-gray-500">{title}</p>
      </div>

      {/* Description */}
      <p className="text-center text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default ProfileCard;
