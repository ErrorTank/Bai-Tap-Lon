import React from "react";
import classnames from "classnames"

export class UploadInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false
    };
  };

  handleUpload = e => {
    e.preventDefault();
    let {imagesPreview, limit = 2} = this.props;
    const files = e.target.files;
    if(files && files.length + imagesPreview.length > limit){
      onError();
    }
    if (file && file.type.indexOf("image") > -1) {
      this.setState({uploading: true});
      this.props.onChange(file).then(
        () => this.setState({uploading: false}),
        () => this.setState({uploading: false})
      )
    }

  };

  componentDidUpdate({imagePreview}) {
    console.log(imagePreview);
    console.log(this.inputElem.value)
    if (!imagePreview && this.inputElem) {
      this.inputElem.value = "";
    }
  }

  render() {
    let {className, imagesPreview, label, content, limit = 2} = this.props;
    return (
      <div className={classnames("upload-input form-group m-form__group row", className)}>
        <label className="col-form-label col-lg-3 col-sm-12">
          {label}
        </label>
        <div className="col-lg-4 col-md-9 col-sm-12">
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
                <div className="dz-preview  dz-image-preview" key={each.value}>
                  <div className="dz-image">
                    <img src={each.value}/>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    );
  }
}
