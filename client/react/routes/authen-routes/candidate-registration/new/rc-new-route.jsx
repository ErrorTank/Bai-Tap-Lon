import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import omit from "lodash/omit"
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {orgLocationSchema, rcSchema} from "../../schema";
import {customHistory} from "../../../routes";

import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {MultipleStepsTabs} from "../../../../common/multiple-steps-tabs/multiple-steps-tabs";
import {RegistrationInfoForm} from "../form/registration-info/registration-info";
import {userInfo} from "../../../../../common/states/user-info";
import {rcApi} from "../../../../../api/common/rc-api";


export class CandidateRegistrationNewRoute extends KComponent {
    constructor(props) {
        super(props);
        this.state = {
            err: "",
            activeTab: 0,
            saving: false,
            loading: false
        };
        this.form = createSimpleForm(rcSchema, {
            initData: {
                sID: userInfo.getState().sID,
                name: "",
                address: "",
                phone: "",
                email: "",
                gender: 0,
                dob: "",
                username: "",
                password: "",
                contestID: "",
                CMT: "",
            }
        });


        this.onUnmount(this.form.on("change", () => this.forceUpdate()));
        this.form.validateData();
    };

    createNewCandidateRegistration = () => {
        this.setState({saving: true});
        let data = this.form.getData();


        rcApi.create({
            ...data,
        }).then(({rcID}) => {
            customHistory.push(`/candidate-register/${rcID}/edit`)
        }).catch(err => this.setState({err, saving: false}))

    };


    handleClickLabel = (step) => {
        this.setState({activeTab: step});
    };


    steps = [
        {
            step: 0,
            label: "Thiết lập thông tin",
            render: () => (
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 p-0">
                        <RegistrationInfoForm
                            form={this.form}
                            onChange={() => this.setState({err: ""})}
                            err={this.state.err}
                        />
                    </div>
                </div>


            ),
            renderActions: () => {
                let canFinish = !this.form.getInvalidPaths().length && !this.state.err;
                return (
                    <div className="">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => customHistory.push("/candidate-registers")}>Hủy bỏ
                        </button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canFinish}
                                onClick={() => this.createNewCandidateRegistration()}
                        >
                            Hoàn thành
                            {this.state.saving && (
                                <LoadingInline/>
                            )}
                        </button>
                    </div>
                )
            }
        }
    ];

    render() {
        let {activeTab} = this.state;

        return (
            <PageTitle title="Tạo đăng ký dự thi">
                <RouteTitle content="Tạo đăng ký dự thi">
                    <div className="rc-new-route">
                        <MultipleStepsTabs
                            onClickLabel={this.handleClickLabel}
                            currentStep={activeTab}
                            steps={this.steps}

                        />
                    </div>
                </RouteTitle>
            </PageTitle>

        );
    }
}