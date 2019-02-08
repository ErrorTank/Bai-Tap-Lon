import get from "lodash/get"
import filter from "lodash/filter"
import isEmpty from "lodash/isEmpty"


export class SimpleSearch {
  indexs = [];
  documents = [];

  constructor({indexs, documents}) {
    if(!indexs) {
      throw new Error("need define indexs");
    } else {
      this.indexs = indexs;
    }

    if (documents) this.documents = documents;
  }

  setDocuments(documents) {
    this.documents = documents;
  }

  checkIndexs(item, keyword) {
    for ( const key in this.indexs ) {
      const indexType = this.indexs[key];
      const dataProperty = get(item, key);
      if (dataProperty === undefined) {
        // console.error("not exist \"%s\" index at row\n%O", key, item);
      } else {
        if (indexType === "Number" && dataProperty.toString().toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
          return true;
        } else if (indexType === "String" && dataProperty.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
          return true;
        } else if (typeof indexType === "function" && indexType(dataProperty, keyword)) {
          return true;
        }
      }
    }

    return false;
  }

  search(keyword) {
    if (isEmpty(keyword)) return this.documents;
    return filter(this.documents, (item) => this.checkIndexs(item, keyword));
  }
}
