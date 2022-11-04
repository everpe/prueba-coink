import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { User } from './../../models/auth.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CharactersService } from '../../services/characters.service';
import { Character } from 'src/app/models/chacrater.model';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements  AfterViewInit  {
  user: User | null = null;
  pipe: DatePipe;
  displayedColumns: string[] = ['image', 'name', 'species', 'gender', 'created'];
  dataSource!: MatTableDataSource<Character>; 

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)  paginator!: MatPaginator;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private charactersService: CharactersService,
    private formBuilder: FormBuilder,
  ) {
    this.pipe = new DatePipe('en');
  }
  form = this.formBuilder.group({
    userField: ['', [Validators.minLength(3), Validators.maxLength(100)]],
    fromDate: new FormControl('', { validators: [Validators.required]}),
    toDate: new FormControl('', { validators: [Validators.required]})
  });


  getDataCharacters(){
    this.charactersService.getAllCharcters()
    .pipe(map(val => val.results))
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
  get fromDate() { return this.form.get('fromDate')?.value ?? new Date(); }
  get toDate() { return this.form.get('toDate')?.value ?? new Date(); }
  

  ngAfterViewInit() {
    this.getDataCharacters();
  }
  //Busqueda de personajes por fechas.
  applyFilter() {
    if(this.form.get('fromDate')?.value && this.form.get('toDate')?.value){
      this.dataSource.data = this.dataSource.data.filter( el => {
        return  new Date(el.created).getTime() >= new Date(this.fromDate).getTime() && 
                new Date(el.created).getTime() <= new Date(this.toDate).getTime()
      });
      // console.log(this.dataSource.data );
      if(this.dataSource.data.length == 0){
        alert("No se encontrarón personajes, Limpie el Formulario de Búsqueda, ¡Por favor!")
      }
    }else{
      alert("Ingrese fechas de busqueda");
    }
  }

  //Busuqueda de personajes por Nombre.
  applyFilterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ClearForm(){
    this.form.reset()
    this.getDataCharacters();
  }
}


