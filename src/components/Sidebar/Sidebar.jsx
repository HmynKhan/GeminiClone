import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { newChat, onSent, previousPrompt, setRecentPrompt } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const expandMenu = () => {
    setExtended(!extended);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={expandMenu}
          className="menu"
          src={assets.menu_icon}
          alt="menu_icon"
        />
        <div onClick={() => newChat()} className="newChat">
          <img src={assets.plus_icon} alt="plus_icon" />
          {extended ? <p>NEW CHAT</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recentTitle">RECENT</p>
            {previousPrompt.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className="recentEntry"
                  key={index}
                >
                  <img src={assets.message_icon} alt="message_icon" />
                  <p>{item.slice(0, 20)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottomItem recentEntry">
          <img src={assets.question_icon} alt="question_icon" />
          {extended ? <p>HELP</p> : null}
        </div>

        <div className="bottomItem recentEntry">
          <img src={assets.history_icon} alt="history_icon" />
          {extended ? <p>ACTIVITY'S</p> : null}
        </div>

        <div className="bottomItem recentEntry">
          <img src={assets.setting_icon} alt="setting_icon" />
          {extended ? <p>SETTING'S</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
