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
import sortBy from "lodash/sortBy"
import isEqual from "lodash/isEqual"
import {prizeSchema} from "../../schema";
import {appModal} from "../../../../common/modal/modals";
import {prizeApi} from "../../../../../api/common/prize-api";
import {PrizeInfoForm} from "../prize-info-form/prize-info-form";


export class PrizeRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      loading: true,
      saving: false,
      draft: {},
      err: "",
      deleting: false

    };

    this.form = createSimpleForm(prizeSchema);
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {prizeID} = props.match.params;

    if(!prizeID){
      customHistory.push(toDefaultRoute());
    }else{
      this.fetchPrize(prizeID);
    }


  };

  fetchPrize = (prizeID) => {
    // let promises = [schoolApi.get(sID), candidateApi.getCandidateBrief({filter: {sID}})];

    prizeApi.get(prizeID).then((data) => {
      let info = pick(data, ["name", "content", "prizeID"]);
      let newInfo = {...info, dir: data.files ? data.files.map(each => ({fileID: each.imgID, src: `/uploads/img/${each.link}`})) : []};
      this.form.updateData({...newInfo}).then(() => this.setState({
        loading: false,
        draft: {...newInfo},
      }));
    }).catch(err => customHistory.push(toDefaultRoute()))
  };

  componentDidMount() {
    this.form.validateData();
  }

  editPrize = () => {
    this.setState({saving: true});
    // let {candidates, canDraft} = this.state;
    let prize = this.form.getData();
    let {draft} = this.state;
    // let promises = [
    //   schoolApi.update(school),
    //   candidateApi.updateMultiple(candidates.filter(each => {
    //     let root = canDraft.find((r) => r.cID === each.cID);
    //     return !isEqual(root, each);
    //   }))
    // ];
    let staticData = pick(prize, "content", "name", "prizeID");
    let created = prize.dir.filter(each => each.hasOwnProperty("file")).map(each => each.file);
    let old = prize.dir.filter(each => !each.hasOwnProperty("file"));
    let deleted = draft.dir.filter(item => !old.find(each => each.fileID === item.fileID)).map(each => each.fileID);
    prizeApi.update({...staticData, deleted: JSON.stringify(deleted), created}, "created").then((data) => {
      let newInfo = {...staticData, dir: data.files ? data.files.map(each => ({fileID: each.imgID, src: `/uploads/img/${each.link}`})) : []};

      this.form.updateData({...newInfo});
      this.setState({draft: {...newInfo}, saving: false});
    }).catch(err => {
      this.setState({err, saving: false});
    })
  };

  deletePrize = () => {
    let {prizeID} = this.props.match.params;
    this.setState({deleting: true});
    appModal.confirm({
      title: "Xác nhận",
      text: "Bạn có muốn xóa giải thưởng này?",
      btnText: "Đồng ý",
      cancelText: "Hủy bỏ"
    }).then((result) => {
      if (result) {

        prizeApi.deletePrize(prizeID).then(() => {

          customHistory.push("/prizes");

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
        <PrizeInfoForm
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
    return (
      <PageTitle
        title="Thông tin giải thưởng"
      >
        <RouteTitle
          content={"Thông tin giải thưởng"}
        >
          <div className="prize-route">
            {loading ? (
              <div className="loading-wrapper">
                <LoadingInline/>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  <FormTabs
                    tabs={this.tabs}
                    activeTab={this.tabs[activeTab]}
                    onChangeTab={(tab, index) => this.setState({activeTab: index})}
                    renderActions={() => (
                      <div className="row justify-content-end p-actions">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => customHistory.push("/prizes")}>Hủy bỏ
                        </button>
                        <button type="button" className="btn btn-danger" onClick={this.deletePrize} disabled={deleting}>
                          {deleting && (
                            <LoadingInline/>
                          )}
                          Xóa giải
                        </button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canSave}
                                onClick={this.editPrize}
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