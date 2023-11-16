import { Component, OnInit } from '@angular/core';
import { IDataOptions, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-demo-apis',
  templateUrl: './demo-apis.component.html',
  styleUrls: ['./demo-apis.component.css']
})
export class DemoApisComponent implements OnInit {
  public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
  
  public dataJson: IDataSet[];
  constructor(public fetch: FetchService) {
  }
    getPivotData(): IDataSet[] {
         let pivotData: IDataSet[] ; //[
    //   { 'Sold': 31, 'Amount': 52824, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
    //   { 'Sold': 51, 'Amount': 86904, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
    //   { 'Sold': 90, 'Amount': 153360, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
    //   { 'Sold': 25, 'Amount': 42600, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
    //   { 'Sold': 27, 'Amount': 46008, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' }];
    pivotData=this.dataJson;
      return pivotData;
    }
   async ngOnInit(): Promise<any>{
    const data = await this.fetch.getTable().pipe().toPromise();
      this.dataJson=JSON.parse(JSON.stringify(data));
    
  
    
  
   
   
        this.gridSettings = {
            columnWidth: 140
          } as GridSettings;
          this.dataSourceSettings = {
              enableSorting: true,
              columns: [{ name: 'year' }, { name: 'quarter' }],
              values: [{ name: 'sold', caption: 'Units Sold' }, { name: 'amount', caption: 'Sold Amount' }],
              dataSource: this.getPivotData(),
              rows: [{ name: 'country' }, { name: 'products' }],
              formatSettings: [{ name: 'amount', format: 'C0' }],
              expandAll: false,
              filters: [],
              conditionalFormatSettings: [
                {
                  value1: 729,
                  value2: 50,
                  conditions: 'Between',
                  style: {
                    backgroundColor: '#80cbc4',
                    color: 'black',
                    fontFamily: 'Tahoma',
                    fontSize: '12px'
                  }
                },
                {
                  value1: 600,
                  value2: 25,
                  conditions: 'Between',
                  style: {
                  backgroundColor: '#f48fb1',
                  color: 'black',
                  fontFamily: 'Tahoma',
                  fontSize: '12px'
                  }
                }
              ] 
            };
    
      }
  

}
