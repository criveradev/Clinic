import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-list-role-user',
  templateUrl: './list-role-user.component.html',
  styleUrls: ['./list-role-user.component.scss']
})
export class ListRoleUserComponent {
  public rolesList: any = [];
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 2;
  public totalData = 0;
  public skip = 0;// Minimi
  public limit: number = this.pageSize; //Maximo
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;
  public role_generals: any = [];

  constructor(public RolesService: RolesService) {

  }

  // Funciones que queremos inicializar.
  ngOnInit() {
    this.getTableData();
  }

  // Metodo que lista todos los roles.
  private getTableData(): void {
    this.rolesList = [];
    this.serialNumberArray = [];

    this.RolesService.indexRoles().subscribe((resp: any) => {
      console.log(resp);
      this.totalData = resp.roles.length; //Numero total de roles enviados por el backend
      this.role_generals = resp.roles; // Almacena todo los roles
      this.getTableGeneral();
    });

  }

  public getTableGeneral() {
    this.rolesList = [];
    this.serialNumberArray = [];
    this.role_generals.map((res: any, index: number) => { // Mapeamos los roles recibidos
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) { //Condicion para mastrorar los roles pero con un limite por pagina
        this.rolesList.push(res);// Si cumple la condicion se agrega a la lista roleslist
        this.serialNumberArray.push(serialNumber);// Se agrega tambien la posicion numerica de los roles que hemos recibido
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.rolesList);
    this.calculateTotalPages(this.totalData, this.pageSize);


  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.rolesList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.rolesList.slice();

    if (!sort.active || sort.direction === '') {
      this.rolesList = data;
    } else {
      this.rolesList = data.sort((a: any, b: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableGeneral();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableGeneral();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableGeneral();
  }

  public PageRefresh(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.searchDataValue = '';
    this.getTableGeneral();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}

