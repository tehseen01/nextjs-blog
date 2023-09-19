import React from "react";

const settingParamsPage = ({
  params,
}: {
  params: { settingParams: string };
}) => {
  return <div>{params.settingParams}: settingParamsPage</div>;
};

export default settingParamsPage;
