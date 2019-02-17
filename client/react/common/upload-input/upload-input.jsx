import React from "react";
import classnames from "classnames"
import {getBase64} from "../../../common/common-utils";

export class UploadInput extends React.Component {
  constructor(props) {
    super(props);

  };

  handleUpload = e => {
    e.preventDefault();
    let {value: imagesPreview, onChange, onError, limit = 2} = this.props;
    const files = e.target.files;
    if(files.length + imagesPreview.length > 8){
      onError("Số lượng file vượt quá " + limit + " file");
      return ;
    }
    let promise=[];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (file && file.type.indexOf("image") > -1) {
        promise.push(getBase64(files[i]));
      }

    }
    Promise.all(promise).then((data)=>{
      onChange(imagesPreview.concat(data));
    });

  };

  componentDidUpdate({value: imagePreview}) {
    if (!imagePreview.length && this.inputElem) {
      this.inputElem.value = "";
    }
  }

  render() {
    let {className, label, content, limit = 2, value: imagesPreview} = this.props;
    return (
      <div className={classnames("upload-input form-group m-form__group row", className)}>
        <label className="col-form-label col-4 text-left p-0">
          {label}
        </label>
        <div className="col-8">
          <div className="m-dropzone dropzone m-dropzone--primary dz-clickable"  onClick={() => this.inputElem.click()}>
            <input
              className="upload-input-tag"
              type="file"
              onChange={this.handleUpload}
              accept="image/*"
              style={{display: "none"}}
              ref={elem => this.inputElem = elem}
              multiple={true}
              name="uploadImg"
            />
            <div className="m-dropzone__msg dz-message needsclick">
              <h3 className="m-dropzone__msg-title">{content}</h3>
              <span className="m-dropzone__msg-desc">Files tối đa {limit}</span>
            </div>
            {imagesPreview.map((each) => {
              return (
                <div className="dz-preview  dz-image-preview" key={each.file}>
                  <div className="dz-image">
                    <img src={each.file}/>
                  </div>
                  <a className="dz-remove">Loại bỏ</a>

                </div>
              )
            })}
          </div>
        </div>
      </div>

    );
  }
}
