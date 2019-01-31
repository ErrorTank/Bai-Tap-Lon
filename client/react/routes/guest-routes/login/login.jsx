import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {GetLocation} from "../../../common/location-tracker";
import {InputBase} from "../../../common/base-input/base-input";
import {simpleValidator} from "../../../common/form-validator/simple-validator/simple-validator";
import {haveChar, haveNumber, maxLength, minLength, onlyWord, exclude} from "../../../common/form-validator/simple-validator/validator";


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.validator = simpleValidator({
      username: {
        arr: [onlyWord, haveChar, haveNumber, minLength(5), maxLength(50)],
        label: "Tên đăng nhập"
      },
      password: {
        arr: [onlyWord, exclude(["-"])],
        label: "Mật khẩu"
      }
    });
  };

  render() {
    let {username, password} = this.state;

    let result = this.validator({
      username,
      password
    });
    let canLogin = result.getInvalids().length() === 0;
    return (
      <PageTitle
        title="Đăng Nhập"
      >
        <GetLocation
          render={(prevLocation) => {
            console.log(prevLocation);
            return (
              <div className="login-route">
                <div className="login-panel-wrap">
                  <div className="login-panel">
                    <div className="panel-header">
                      <div className="app-logo">
                        <img src="./assets/logo.png"/>
                      </div>
                    </div>
                    <div className="panel-body">
                      {result.validateComp((res) => (
                        <InputBase
                          className="login-input"
                          fail={!res.result}
                          value={username}
                          label={"Tên đăng nhập"}
                          notify={res.msg}
                          onChange={e => this.setState({username: e.target.value})}
                        />
                      ), "username")}
                      {result.validateComp((res) => (
                        <InputBase
                          className="login-input"
                          fail={!res.result}
                          value={password}
                          label={"Mật khẩu"}
                          notify={res.msg}
                          onChange={e => this.setState({password: e.target.value})}
                        />
                      ), "password")}
                    </div>
                    <div className="panel-footer">
                      <button type="button" className="btn btn-info" disabled={!canLogin}>Đăng nhập</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }}
        />
      </PageTitle>
    );
  }
}
