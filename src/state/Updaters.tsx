import React from "react";
import ApplicationUpdater from "./application/updater";
import TokenUpdater from "./token/updater";
import TransactionUpdater from "./transactions/updater";
import UserUpdater from "./user/updater";

const Updaters = () => (
  <>
    <ApplicationUpdater />
    <TokenUpdater />
    <TransactionUpdater />
    <UserUpdater />
  </>
);

export default Updaters;
