"use client";
import { useEffect, useState } from "react";
import { SectionCard } from "./Cards";
import { notification, Switch, TimePicker } from "antd";
import dayjs from "dayjs";
import {
  BusinessHour,
  getMerchantBusinessHour,
  putMerchantBusinessHour,
} from "@/app/lib/api/merchant/profile";
import { getLocalStorageItem } from "@/app/lib/api/utils";

export function MerchantBusinessHourEdit() {
  const [timeData, setTimeData] = useState<BusinessHour[]>();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    async function fetchTimeData() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const res = await getMerchantBusinessHour(accessToken);
      console.log(res);
      if (res.items) {
        setTimeData(
          res.items.map(({ day, open, close }) => ({
            day,
            open,
            close,
          })),
        );
      }
    }
    fetchTimeData();
  }, []);

  function handleOpenTimeChange(day: string, openTime: string | null) {
    if (openTime === null) return;
    setTimeData((prev) =>
      prev?.map((data) => {
        if (data.day === day) {
          return { ...data, open: openTime };
        }
        return data;
      }),
    );
  }

  function handleCloseTimeChange(day: string, closeTime: string | null) {
    if (closeTime === null) return;
    setTimeData((prev) =>
      prev?.map((data) => {
        if (data.day === day) {
          return { ...data, close: closeTime };
        }
        return data;
      }),
    );
  }

  function handleSwitchToggled(day: string, checked: boolean) {
    if (!checked) {
      setTimeData((prev) =>
        prev?.map((data) => {
          if (data.day === day) {
            return { ...data, open: null, close: null };
          }
          return data;
        }),
      );
    }
  }

  async function handleSubmit() {
    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) return;
    if (!timeData) return;
    const res = await putMerchantBusinessHour(accessToken, timeData);
    if (res.message) {
      api.info({
        title: "Success",
        description: res.message,
        placement: "topRight",
        pauseOnHover: true,
        showProgress: true,
      });
    }
  }

  return (
    <SectionCard title={"Edit business hour"} description={""}>
      {contextHolder}
      <div className="flex flex-col gap-0.5">
        {timeData?.map(({ open, close, day }) => (
          <HourSettings
            key={day}
            day={day}
            open={open ?? null}
            close={close ?? null}
            onOpenChange={handleOpenTimeChange}
            onCloseChange={handleCloseTimeChange}
            onSwitchToggled={handleSwitchToggled}
          />
        ))}
        <div className="flex justify-end">
          <button
            className="items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md cursor-pointer"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

type HourSettingsProps = {
  day: string;
  open: string | null;
  close: string | null;
  onSwitchToggled: (day: string, checked: boolean) => void;
  onOpenChange: (day: string, openTime: string | null) => void;
  onCloseChange: (day: string, closeTime: string | null) => void;
};

function HourSettings({
  day,
  close,
  open,
  onSwitchToggled,
  onOpenChange,
  onCloseChange,
}: HourSettingsProps) {
  const [isChecked, setChecked] = useState(open && close ? true : false);
  const [isDisabled, setDisable] = useState(open && close ? false : true);

  function handleSwitchCheck(checked: boolean) {
    onSwitchToggled(day, checked);
    setChecked(checked);
    setDisable(!checked);
  }

  const format = "HH:mm";

  function handleOpenChange(timeString: string | null) {
    onOpenChange(day, timeString);
  }

  function handleCloseChange(timeString: string | null) {
    onCloseChange(day, timeString);
  }

  return (
    <div className="flex items-center gap-4 px-3.5 py-2.5 rounded-lg">
      <div className="flex items-center gap-2.5">
        <span className={`w-30 text-gray-900`}>{day}</span>
        <Switch checked={isChecked} onClick={handleSwitchCheck} />
      </div>
      <div className="flex items-center gap-2">
        {isChecked ? (
          <>
            <span className="text-sm font-medium tabular-nums text-gray-900">
              <TimePicker
                defaultValue={open ? dayjs(open, format) : undefined}
                format={format}
                showNow={false}
                disabled={isDisabled}
                onChange={(_date, dateString) => handleOpenChange(dateString)}
              />
            </span>
            <span className="text-gray-400">–</span>
            <span className="text-sm font-medium tabular-nums text-gray-900">
              <TimePicker
                defaultValue={close ? dayjs(close, format) : undefined}
                format={format}
                showNow={false}
                disabled={isDisabled}
                onChange={(_date, dateString) => handleCloseChange(dateString)}
              />
            </span>
          </>
        ) : (
          <span className="text-sm text-gray-400">Closed all day</span>
        )}
      </div>
    </div>
  );
}
