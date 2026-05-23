"use client";
import { Skeleton } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonInput from "antd/es/skeleton/Input";

export default function Loading() {
  return (
    <div className="xl:px-30 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* profile menu */}
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

      {/* bookings information */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-md shadow-sm border border-[#364049]/10 p-6">
          {/* header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#364049]/10">
            <div>
              <SkeletonInput
                active
                size="default"
                style={{ width: 160, marginBottom: 10 }}
              />

              <br />

              <SkeletonInput active size="small" style={{ width: 220 }} />
            </div>
          </div>

          {/* booking cards */}
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="border border-[#364049]/10 rounded-md p-6"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <SkeletonInput
                      active
                      size="default"
                      style={{ width: 200, marginBottom: 12 }}
                    />

                    <br />

                    <SkeletonInput active size="small" style={{ width: 320 }} />
                  </div>

                  <SkeletonInput active size="default" style={{ width: 100 }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Skeleton active paragraph={{ rows: 2 }} title={false} />
                  <Skeleton active paragraph={{ rows: 2 }} title={false} />
                </div>

                <SkeletonInput active size="small" style={{ width: 180 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
