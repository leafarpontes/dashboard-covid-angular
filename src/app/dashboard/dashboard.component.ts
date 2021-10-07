import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DadosModel } from './dados.model';

declare var google:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('formDados', {static: true})formDados:NgForm;

  dadosModel:DadosModel;

  constructor() { }

  ngOnInit(): void {
    this.init();
    this.dadosModel = new DadosModel();
  }

  init():void {
    if (typeof(google) !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  exibirGraficos():void {
    this.drawChart();
  }

  drawChart() {

    var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Junho', this.dadosModel.casosJunho],
          ['Julho', this.dadosModel.casosJulho],
          ['Agosto', this.dadosModel.casosAgosto],
          ['Setembro', this.dadosModel.casosSetembro],
        ]);

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, this.obterOpcoes());
    
  }

  obterOpcoes():any {
    return {
      'title': 'Quantidade de casos confirmados em 4 meses',
      'width': 400,
      'height': 300,
      slices: {0: {color: '#D980FA'}, 
      1: {color: '#9980FA'}, 
      2: {color: '#FDA7DF'},
      3: {color: '#5758BB'},
    }
    }
  }

}
