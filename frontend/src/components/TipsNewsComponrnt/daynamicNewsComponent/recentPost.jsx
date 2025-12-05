import React from "react";
import MainHeading from "../../Heading/mainHeading";
import Text from "../../Heading/text";
import RecentPostCard from "../../RecentPostCard";

function RecentPost() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <MainHeading heading="RECENT POSTS" textColor="primary" />
        <Text content="Here we will find the latest post about this car" />
      </div>
      <div className="grid grid-cols-3 gap-5 py-10">
        <RecentPostCard />
        <RecentPostCard />
        <RecentPostCard />
        <RecentPostCard />
        <RecentPostCard />
        <RecentPostCard />
      </div>
    </div>
  );
}

export default RecentPost;
