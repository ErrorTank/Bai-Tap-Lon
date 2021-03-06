import React from "react";
import {InputBase} from "../../../../../common/base-input/base-input";
import {Select} from "../../../../../common/select/select";
import {contestApi} from "../../../../../../api/common/contest-api";





export class RegistrationInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contests: []
        };
        contestApi.getContestsBrief().then((contests) => {
            this.setState({contests});
        });
    };

    generateError =() => {
        let {err, form} = this.props;
        let {username, email, CMT} = form.getData();
        let msg = {
            "username_existed": `Tên đăng nhập ${username} đã tồn tại!`,
            "email_existed": `Email ${email} đã tồn tại!`,
            "CMT_existed": `CMT ${CMT} đã tồn tại!`
        };
        return  (err.hasOwnProperty("message") && msg.hasOwnProperty(err.message))  ?  msg[err.message] : "Đã có lỗi xảy ra!";
    };

    render() {
        let {form, err, onChange: propsOnChange, renderNavigate = () => null, showPassword = false} = this.props;
        return (
            <div className="registration-info-form">
                <div className="m-form m-form--fit m-form--label-align-right m-form--state">
                    {err && (
                        <div className="row">
                            <div className="server-error pb-3 col">
                                <p>
                                    {this.generateError()}
                                </p>

                            </div>
                        </div>
                    )}

                    <div className="row">
                        <div className="col-6">
                            {form.enhanceComponent("name", ({error, onEnter, onChange, ...others}) => (
                                <InputBase
                                    className="rc-input pt-0"
                                    error={error}
                                    id={"name"}
                                    onKeyDown={onEnter}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(e);
                                    }}
                                    type={"text"}
                                    label={"Tên đầy đủ"}
                                    {...others}
                                />
                            ), true)}
                        </div>
                        <div className="col-6">

                            {form.enhanceComponent("address", ({error, onEnter, onChange, ...others}) => (
                                <InputBase
                                    className="rc-input pt-0"
                                    error={error}
                                    id={"address"}
                                    onKeyDown={onEnter}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(e);
                                    }}
                                    type={"text"}
                                    label={"Địa chỉ"}
                                    {...others}
                                />
                            ), true)}

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-6">
                            {form.enhanceComponent("phone", ({error, onEnter, onChange, ...others}) => (
                                <InputBase
                                    className="rc-input pt-0"
                                    error={error}
                                    id={"phone"}
                                    onKeyDown={onEnter}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(e);
                                    }}
                                    type={"text"}
                                    label={"Số điện thoại"}
                                    {...others}
                                />
                            ), true)}
                        </div>
                        <div className="col-6">
                            {form.enhanceComponent("email", ({error, onEnter, onChange, ...others}) => (
                                <InputBase
                                    className="rc-input pt-0"
                                    error={error}
                                    id={"email"}
                                    onKeyDown={onEnter}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(e);
                                    }}
                                    type={"text"}
                                    label={"Email"}
                                    {...others}
                                />
                            ), true)}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            {form.enhanceComponent("contestID", ({error, onEnter, onChange, value, ...others}) => (
                                <Select
                                    className="rc-input pt-0"
                                    options={this.state.contests}
                                    value={value}
                                    displayAs={(each) => each.contestName}
                                    getValue={each => each.contestID}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(e.target.value)
                                    }}
                                    label={"Kì thi"}
                                    placeholder="Chọn kì thi"
                                />
                            ), true)}
                        </div>
                        <div className="col-6">
                            {form.enhanceComponent("CMT", ({error, onEnter, onChange, ...others}) => (
                                <InputBase
                                    className="rc-input pt-0"
                                    error={error}
                                    id={"CMT"}
                                    onKeyDown={onEnter}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(e);
                                    }}
                                    type={"text"}
                                    label={"CMT"}
                                    {...others}
                                />
                            ), true)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {form.enhanceComponent("username", ({error, onEnter, onChange,...others}) => (
                                <InputBase
                                    className="rc-input pt-0"
                                    error={error}
                                    id={"username"}
                                    onKeyDown={onEnter}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(e);
                                    }}
                                    type={"text"}
                                    label={"Tên đăng nhập"}
                                    {...others}
                                />
                            ), true)}
                        </div>
                        <div className="col-6">
                            {form.enhanceComponent("password", ({error, onEnter, onChange,...others}) => (
                                <InputBase
                                    className="rc-input pt-0"
                                    error={error}
                                    id={"password"}
                                    onKeyDown={onEnter}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(e);
                                    }}
                                    type={showPassword ? 'text' : "password"}
                                    label={"Password"}
                                    {...others}
                                />
                            ), true)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {form.enhanceComponent("dob", ({error, onEnter, onChange, ...others}) => (
                                <InputBase
                                    className="rc-input pt-0"
                                    error={error}
                                    id={"dob"}
                                    onKeyDown={onEnter}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(e);
                                    }}
                                    type={"date"}
                                    label={"Ngày sinh"}
                                    {...others}
                                />
                            ), true)}
                        </div>
                        <div className="col-6">
                            {form.enhanceComponent("gender", ({value, onChange}) => (
                                <Select
                                    className="rc-input pt-0"
                                    options={[{label: "Nam", value: 0}, {label: "Nữ", value: 1}]}
                                    value={value}
                                    onChange={e => {
                                        propsOnChange();
                                        onChange(Number(e.target.value))
                                    }}
                                    label={"Giới tính"}
                                    placeholder="Chọn giới tính"
                                />

                            ), true)}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}