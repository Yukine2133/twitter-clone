import { IUser } from "@/types/user.interface";
import React from "react";
import UserCard from "../search/UserCard";
import Foo from "../Foo";

interface IFollowModal {
  follow: IUser[];
  isFollowers: boolean;
  username: string;
  id: string;
}

const FollowModal = ({ follow, isFollowers, username, id }: IFollowModal) => {
  return (
    <Foo id={id}>
      {follow.map((follower) => (
        <UserCard key={follower.username} user={follower} />
      ))}
      {follow.length === 0 && (
        <h5 className="text-lg font-semibold">
          {isFollowers
            ? `${username} does not have any followers.`
            : `${username}  does not follow anyone.`}
        </h5>
      )}
    </Foo>
  );
};

export default FollowModal;
