"use client";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonInput from "antd/es/skeleton/Input";

export function UserProfileMenuLoading() {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-md shadow-sm border border-[#364049]/10 p-6">
        <div className="flex items-center gap-4 mb-6">
          <SkeletonAvatar active size={64} shape="circle" />

          <div className="flex-1">
            <SkeletonInput
              active
              size="small"
              style={{ width: 120, marginBottom: 8 }}
            />

            <br />

            <SkeletonInput active size="small" style={{ width: 180 }} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((item) => (
            <SkeletonInput key={item} active block size="large" />
          ))}
        </div>
      </div>
    </div>
  );
}
