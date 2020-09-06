import { Component, OnInit } from '@angular/core';
import { SendreceiveService } from './../../services/sendreceive.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categoryname: string;
  categories: any[];
  serachData: any[];
  selectedCategory: string;
  showContent: boolean = false;
  contentname: string;
  public searchApp: any;
  filteredArray: any[];
  addContent: any;
  fileName: any;
  fileContent: any;
  constructor(public sendReceiveService: SendreceiveService) { }

  ngOnInit() {

    this.serachData = [
      { name: 'Rajesh' },
      { name: 'Kumar' },
      { name: 'Ram' },
      { name: 'Rajnish' },
    ]
  }

  //adding category
  addCategory() {
    console.log("adding category and name is ", this.categoryname);
    this.sendReceiveService.send({ modelId: "102", categoryname: this.categoryname }).subscribe((addCategoryResp) => {
      if (addCategoryResp.Data.responseCode == 0) {
        //this.categories.push(addCategoryResp.Data.)
        this.categories = addCategoryResp.Data.categoriesToShow;
      }
    })
  }

  onChange() {
    this.showContent = true;
    console.log(this.selectedCategory);
  }

  searchContent() {
    this.filteredArray = this.searchFilterArrayOfJson(this.serachData, this.searchApp);
    console.log(this.filteredArray);
  }


  //search from Array on json Object
  searchFilterArrayOfJson(searchArray: any[], searchValue: string) {
    let filteredArray = [];

    for (let i = 0; i <= searchArray.length - 1; i++) {
      let temp = searchArray[i].name.toLowerCase();
      let splitArray = temp.split(searchValue.toLowerCase());
      if (splitArray.length > 1) {
        console.log('split length>0 : ' + temp);
        filteredArray.push(searchArray[i]);
      }
      else {
        if (splitArray[0].length !== temp.length) {
          filteredArray.push(searchArray[i]);
        }
      }
    }
    return filteredArray;
  }


  //adding content

  addContentMethod() {
    console.log(this.addContent);
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileContent = reader.result
      }
    }
  }

  //uploading files
  upload() {

    let msgToSend = { modelId: "103", name: this.fileName, content: this.fileContent };
    this.sendReceiveService.send(msgToSend).subscribe(dashboardResp => {
      console.log("store to node js ");
    })

  }
}
