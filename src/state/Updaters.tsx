import React from "react";
import ApplicationUpdater from "./application/updater";
import TokenUpdater from "./token/updater";
import UserUpdater from "./user/updater";

const Updaters = () => (
  <>
    <ApplicationUpdater />
    <TokenUpdater />
    <UserUpdater />
  </>
);

export default Updaters;
