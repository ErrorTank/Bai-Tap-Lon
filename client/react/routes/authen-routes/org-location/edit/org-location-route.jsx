import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {FormTabs} from "../../../../common/form-tabs/form-tabs";
import {customHistory} from "../../../routes";
import {userInfo} from "../../../../../common/states/user-info";
import {userApi} from "../../../../../api/common/user-api";
import {toDefaultRoute} from "../../../route-type";
import classnames from "classnames"
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import * as yup from "yup";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {KComponent} from "../../../../common/k-component";
import pick from "lodash/pick"
import isEqual from "lodash/isEqual"
import uniquid from "uniquid";
import omit from "lodash/omit"
import {orgLocationSchema} from "../../schema";
import {authenCache} from "../../../../../common/cache/authen-cache";
import {schoolPresenterApi} from "../../../../../api/common/school-presenter-api";
import {appModal} from "../../../../common/modal/modals";
import {orgLocationApi} from "../../../../../api/common/org-location-api";
import {OrgLocationInfoForm} from "../form/org-location-info/org-location-info-form";
import {InitialRoomInfoForm} from "../form/initial-room-info/initial-room-info-form";
import {prizeApi} from "../../../../../api/common/prize-api";


export class OrgLocationRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.tabs[0],
      loading: true,
      saving: false,
      draft: {},
      inf: {},
      err: "",
      deleting: false
    };

    this.form = createSimpleForm(orgLocationSchema);

    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {orgLocationID} = props.match.params;
    if (orgLocationID) {
      this.fetchOrgLocation(orgLocationID)
    } else {
      customHistory.push(toDefaultRoute());
    }
  };

  componentDidMount() {
    this.form.validateData();
  };

  fetchOrgLocation = (orgLocationID) => {
    orgLocationApi.get(orgLocationID).then(data => {
      let info = pick(data, ["orgLocationID", "name", "address", "phone"]);
      this.form.updateData({...info, rooms: info.rooms ? info.rooms.map(each => each.keyID = uniquid()) : []}).then(() => this.setState({loading: false, draft: {...info}}));
    }).catch(err => customHistory.push(toDefaultRoute()))
  };


  editOrgLocation = () => {
    this.setState({saving: true});
    let {draft} = this.state;
    let orgLocation = this.form.getData();
    let rooms = orgLocation.rooms;
    let old = rooms.filter(each => each.hasOwnProperty("roomID"));
    let created = rooms.filter(each => !each.hasOwnProperty("roomID"));
    let deleted = draft.rooms.filter(each => !old.find(item => item.roomID === each.roomID));
    orgLocationApi.update({deleted: [...deleted], created: [...created], ...omit(orgLocation, "rooms")}).then((data) => {
      this.form.updateData({...data});
      this.setState({draft: {...data}, saving: false});
    }).catch(err => {
      this.setState({err, saving: false});
    })
  };

  handleDeleteOrgLocation = () => {
    appModal.confirm({
      title: "Xác nhận",
      text: "Bạn có muốn xóa địa điểm tổ chức này?",
      btnText: "Đồng ý",
      cancelText: "Hủy bỏ"
    }).then((result) => {
      if (result) {
        this.setState({deleting: true});
        orgLocationApi.delete(this.props.match.params.orgLocationID).then(() => {
          customHistory.push("/org-locations");

        }).catch(err => this.setState({err, deleting: false}))
      }
    });

  };

  tabs = [
    {
      label: "Thông tin cơ bản",
      render: () => (
        <OrgLocationInfoForm
          form={this.form}
          onChange={() => this.setState({err: ""})}
          err={this.state.err}
        />
      )
    }, {
      label: "Thông tin phòng",
      render: () => (
        <InitialRoomInfoForm
          form={this.form}
          onChange={() => this.setState({err: ""})}
          err={this.state.err}
        />
      )
    },
  ];


  render() {
    let {activeTab, loading, saving, draft, deleting} = this.state;
    let canSave = !this.form.getInvalidPaths().length && !saving && !isEqual(draft, this.form.getData());
    return (
      <PageTitle
        title="Thông tin địa điểm tổ chức"
      >
        <RouteTitle
          content={"Thông tin địa điểm tổ chức"}
        >
          <div className="org-location-route">
            {loading ? (
              <div className="loading-wrapper">
                <LoadingInline/>
              </div>
            ) : (
              <div className="row justify-content-center">
                <div className="col-12 col-xl-10 tabs-wrap">
                  <FormTabs
                    tabs={this.tabs}
                    activeTab={activeTab}
                    onChangeTab={tab => this.setState({activeTab: tab})}
                    renderActions={() => (
                      <div className="row justify-content-end ol-actions">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => customHistory.push("/org-locations")}>Hủy bỏ
                        </button>
                        <button type="button" className="btn btn-danger" onClick={this.handleDeleteOrgLocation}>
                          {deleting && (
                            <LoadingInline/>
                          )}
                          Xóa địa điểm tổ chức
                        </button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canSave}
                                onClick={this.editOrgLocation}
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
            )}
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}