import React from "react";
import { PageHOC } from "../components";

const CreateBattle = () => {
  return (
    <div>
      <h1 className="text-white text-xl"> Hello from create Battle</h1>
    </div>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your own Battle and wait for others players to join you</>
);
