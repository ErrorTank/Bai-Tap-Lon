import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {FormTabs} from "../../../../common/form-tabs/form-tabs";
import {UserViewCol} from "../../../../common/user-view-col/user-view-col";
import {customHistory} from "../../../routes";
import {userInfo} from "../../../../../common/states/user-info";
import {toDefaultRoute} from "../../../route-type";
import classnames from "classnames"

import {LoadingInline} from "../../../../common/loading-inline/loading-inline";

import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {KComponent} from "../../../../common/k-component";
import pick from "lodash/pick"
import isEqual from "lodash/isEqual"
import {supervisorApi} from "../../../../../api/common/supervisor-api";
import {appModal} from "../../../../common/modal/modals";
import {rcSchema} from "../../schema";
import {rcApi} from "../../../../../api/common/rc-api";
import {RegistrationInfoForm} from "../form/registration-info/registration-info";


export class RcRoute extends KComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.tabs[0],
            loading: true,
            saving: false,
            draft: {},
            err: "",
            deleting: false
        };

        this.form = createSimpleForm(rcSchema);
        this.onUnmount(this.form.on("change", () => this.forceUpdate()));
        let {rcID} = props.match.params;
        if(rcID){
            rcApi.checkRc(rcID, userInfo.getState().sID).then(() => {
                this.fetchRc(rcID)
            }).catch(err =>  customHistory.push(toDefaultRoute()));

        }else{
            customHistory.push(toDefaultRoute());
        }

    };

    fetchRc = (rcID) => {
        rcApi.get(rcID).then(data => {
            this.form.updateData({...data}).then(() =>  this.setState({loading: false, draft: {...data}}));
        }).catch(err => customHistory.push(toDefaultRoute()))
    };

    componentDidMount(){
        this.form.validateData();
    }

    editRc = () => {
        this.setState({saving: true});
        let rc = this.form.getData();

        rcApi.update(rc).then(() => {
            this.setState({draft: {...rc}, saving: false});
        }).catch(err =>{
            this.setState({err, saving: false});
        })
    };

    deleteRc = () => {
        let {rcID} = this.props.match.params;
        this.setState({deleting: true});
        appModal.confirm({
            title: "Xác nhận",
            text: "Bạn có muốn xóa đăng ký này?",
            btnText: "Đồng ý",
            cancelText: "Hủy bỏ"
        }).then((result) => {
            if (result) {

                rcApi.delete(rcID).then(() => {

                    customHistory.push("/candidate-registers");

                }).catch(err => {

                    this.setState({err, deleting: false})
                })
            }else{
                this.setState({deleting: false});
            }
        });


    };

    tabs = [
        {
            label: "Thông tin cơ bản",
            render: () => (
                <RegistrationInfoForm
                    form={this.form}
                    err={this.state.err}
                    onChange={() => this.setState({err: ""})}
                />
            )
        },
    ];


    render() {
        let {activeTab, loading, saving, draft, err, deleting} = this.state;


        let canSave = !this.form.getInvalidPaths().length && !saving && !isEqual(draft, this.form.getData()) && !err;
        console.log(this.form.getData())
        return (
            <PageTitle
                title="Thông tin đăng ký"
            >
                <RouteTitle
                    content={"Thông tin đăng ký"}
                >
                    <div className="rc-route">
                        {loading ? (
                            <div className="loading-wrapper">
                                <LoadingInline/>
                            </div>
                        ) : (
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-10">
                                    <FormTabs
                                        tabs={this.tabs}
                                        activeTab={activeTab}
                                        onChangeTab={tab => this.setState({activeTab: tab})}
                                        renderActions={() => (
                                            <div className="row justify-content-end rc-actions">
                                                <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/candidate-registers")}>Hủy bỏ</button>
                                                <button type="button" className="btn btn-danger" onClick={this.deleteRc} disabled={deleting}>
                                                    {deleting && (
                                                        <LoadingInline/>
                                                    )}
                                                    Xóa đăng ký
                                                </button>
                                                <button type="button"
                                                        className="btn btn-primary"
                                                        disabled={!canSave}
                                                        onClick={this.editRc}
                                                >
                                                    {saving && (
                                                        <LoadingInline/>
                                                    )}
                                                    Lưu thay đổi

                                                </button>
                                            </div>
                                        )}
                                    />

                                </div>
                            </div>
                        )

                        }


                    </div>
                </RouteTitle>

            </PageTitle>
        );
    }
}