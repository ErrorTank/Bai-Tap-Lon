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
import {subjectSchema} from "../../schema";
import {subjectApi} from "../../../../../api/common/subject-api";
import {appModal} from "../../../../common/modal/modals";
import {SubjectInfoForm} from "../subject-info-form/subject-info-form";


export class SubjectRoute extends KComponent {
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

    this.form = createSimpleForm(subjectSchema);
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {subjectID} = props.match.params;
    console.log(subjectID)
    if(subjectID ){

      this.fetchSubject(subjectID)
    }else{
      customHistory.push(toDefaultRoute());
    }

  };

  fetchSubject = (subjectID) => {
    subjectApi.get(subjectID).then(data => {
      let info = pick(data, ["subjectID", "name", "content"]);
      this.form.updateData({...info}).then(() =>  this.setState({loading: false, draft: {...info}}));
    }).catch(err => customHistory.push(toDefaultRoute()))
  };

  componentDidMount(){
    this.form.validateData();
  }

  editSubject = () => {
    this.setState({saving: true});
    let subject = this.form.getData();

    subjectApi.update(subject).then(() => {

      this.setState({draft: {...subject}, saving: false});
    }).catch(err =>{
      this.setState({err, saving: false});
    })
  };

  deleteSubject = () => {
    let {subjectID} = this.props.match.params;
    this.setState({deleting: true});
    appModal.confirm({
      title: "Xác nhận",
      text: "Bạn có muốn xóa môn thi này?",
      btnText: "Đồng ý",
      cancelText: "Hủy bỏ"
    }).then((result) => {
      if (result) {

        subjectApi.delete(subjectID).then(() => {

          customHistory.push("/subjects");

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
        <SubjectInfoForm
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
    console.log(canSave)
    return (
      <PageTitle
        title="Thông tin môn thi"
      >
        <RouteTitle
          content={"Thông tin môn thi"}
        >
          <div className="subject-route">
            {loading ? (
              <div className="loading-wrapper">
                <LoadingInline/>
              </div>
            ) : (
              <div className="row">

                <div className="col">
                  <FormTabs
                    tabs={this.tabs}
                    activeTab={activeTab}
                    onChangeTab={tab => this.setState({activeTab: tab})}
                    renderActions={() => (
                      <div className="row justify-content-end s-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/subjects")}>Hủy bỏ</button>
                        <button type="button" className="btn btn-danger" onClick={this.deleteSubject} disabled={deleting}>
                          {deleting && (
                            <LoadingInline/>
                          )}
                          Xóa môn thi
                        </button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canSave}
                                onClick={this.editSubject}
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