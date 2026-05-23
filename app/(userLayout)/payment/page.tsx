import { Skeleton } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonImage from "antd/es/skeleton/Image";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonNode from "antd/es/skeleton/Node";

export default async function PaymentPage() {
  return (
    <div>
      {/* <Skeleton avatar paragraph={false}></Skeleton>
      <SkeletonAvatar />
      <SkeletonButton /> */}
      {/* <SkeletonInput /> */}
      {/* <SkeletonNode /> */}
      <SkeletonImage />
    </div>
  );
}
