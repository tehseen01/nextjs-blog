"use client";

import Icon from "@/components/Icon";
import { Button, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const router = useRouter();

  const settingParams = params.settingParams;

  const handleSettingParams = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let path = value === "profile" ? "/setting" : `/setting/${value}`;
    router.push(path);
  };

  return (
    <main className="grid md:grid-cols-[25%_1fr] gap-4 p-6">
      <aside className="">
        <div className="flex flex-col gap-3 max-md:hidden">
          {LinkProp.map((link) => (
            <Button
              key={link.value}
              as={Link}
              href={
                link.value === "profile" ? "/setting" : `/setting/${link.value}`
              }
              radius="sm"
              fullWidth
              variant={
                params.settingRoute === link.value
                  ? "flat"
                  : !params.settingRoute && link.value === "profile"
                  ? "flat"
                  : "light"
              }
              className="justify-start"
            >
              {link.icon} {link.label}
            </Button>
          ))}
        </div>
        <div className="md:hidden">
          <Select
            items={LinkProp}
            fullWidth
            defaultSelectedKeys={["profile"]}
            placeholder="Setting Navigation"
            aria-label="Navigation inside setting"
            selectorIcon={<Icon name="chevrons-up-down" />}
            radius="sm"
            onChange={handleSettingParams}
            selectedKeys={
              settingParams === "customization"
                ? ["customization"]
                : settingParams === "notification"
                ? ["notification"]
                : settingParams === "account"
                ? ["account"]
                : settingParams === "billing"
                ? ["billing"]
                : settingParams === "organization"
                ? ["organization"]
                : settingParams === "extension"
                ? ["extension"]
                : ["profile"]
            }
          >
            {(link) => (
              <SelectItem
                aria-label={link.label}
                key={link.value}
                startContent={<>{link.icon}</>}
              >
                {link.label}
              </SelectItem>
            )}
          </Select>
        </div>
      </aside>
      {children}
    </main>
  );
};

export default SettingLayout;

export const LinkProp = [
  {
    label: "Profile",
    value: "profile",
    icon: <Icon name="smile" />,
  },
  {
    label: "Customization",
    value: "customization",
    icon: <Icon name="cog" />,
  },
  {
    label: "Notification",
    value: "notification",
    icon: <Icon name="bell" />,
  },
  {
    label: "Account",
    value: "account",
    icon: <Icon name="key-round" />,
  },
  {
    label: "Billing",
    value: "billing",
    icon: <Icon name="credit-card" />,
  },
  {
    label: "Organization",
    value: "organization",
    icon: <Icon name="building" />,
  },
  {
    label: "Extension",
    value: "extension",
    icon: <Icon name="zap" />,
  },
];
