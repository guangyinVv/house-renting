import React from "react";
import styles from "./index.module.css";
import { BaseURL } from "../../../utils/useAxios";

const PersonalCenter = () => {
  const DEFAULT_BACKGROUND = `${BaseURL}/img/profile/bg.png`;
  const DEFAULT_AVATAR = `${BaseURL}/img/profile/avatar.png`;
  return (
    <>
      <div className={styles.header}>
        <img
          className={styles.backgroundImg}
          src={DEFAULT_BACKGROUND}
          alt=""
        ></img>
        <div className={styles.userBackground}>
          <div className={styles.avatar}>
            <img src={DEFAULT_AVATAR} alt=""></img>
          </div>
          <div className="">游客</div>
        </div>
      </div>
    </>
  );
};

export default PersonalCenter;
