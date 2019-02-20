import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import omit from "lodash/omit"
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {orgLocationSchema} from "../../schema";
import {customHistory} from "../../../routes";

import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {MultipleStepsTabs} from "../../../../common/multiple-steps-tabs/multiple-steps-tabs";
import {OrgLocationInfoForm} from "../form/org-location-info/org-location-info-form";
import {InitialRoomInfoForm} from "../form/initial-room-info/initial-room-info-form";
import {orgLocationApi} from "../../../../../api/common/org-location-api";


export class OrgLocationNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      activeTab: 0,
      saving: false,
      loading: false
    };
    this.form = createSimpleForm(orgLocationSchema, {
      initData: {
        name: "",
        address: "",
        phone: "",
        rooms: []
      }
    });


    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };

  createNewOrgLocation = () => {
    this.setState({saving: true});
    let location = this.form.getData();
    console.log({
      location
    });

    orgLocationApi.createOrgLocation({...location, rooms: location.rooms.map(each => omit(each, 'keyID'))}).then(({orgLocationID}) => {
      customHistory.push(`/org-location/${orgLocationID}/edit`)
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
            <OrgLocationInfoForm
              form={this.form}
              onChange={() => this.setState({err: ""})}
              err={this.state.err}
            />
          </div>
        </div>


      ),
      isDone: () => {
        return this.form.isValid();
      },
      renderActions: () => {
        let canFinish = !this.form.getInvalidPaths().length && !this.state.err;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/org-locations")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewOrgLocation}
            >
              Hoàn thành
              {this.state.saving && (
                <LoadingInline/>
              )}
            </button>
          </div>
        )
      }
    }, {
      step: 1,
      label: "Thiết lập phòng",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12 p-0">
            <InitialRoomInfoForm
              form={this.form}
              onChange={() => this.setState({err: ""})}
              err={this.state.err}
            />
          </div>
        </div>


      ),
      isDone: () => {
        return this.form.isValid();
      },
      renderActions: () => {
        let canFinish = !this.form.getInvalidPaths().length && !this.state.err;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/org-locations")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewOrgLocation}
            >
              Hoàn thành
              {this.state.saving && (
                <LoadingInline/>
              )}
            </button>
          </div>
        )
      }
    },
  ];

  render() {
    let {activeTab} = this.state;
    console.log(this.form.getInvalidPaths())
    return (
      <PageTitle title="Tạo địa điểm tổ chức mới">
        <RouteTitle content="Tạo địa điểm tổ chức mới">
          <div className="org-location-new-route">
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