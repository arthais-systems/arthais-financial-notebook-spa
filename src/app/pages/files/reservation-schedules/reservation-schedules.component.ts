import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-schedules.component.html',
  styleUrls: ['./reservation-schedules.component.css']
})
export class ReservationSchedulesComponent {
  // Dados fornecidos
  data: { [key: string]: any }[] = [
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20231752189',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR00961',
      valorReservado: '2.599.659,96',
      mes: 202401
    },
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20240231547',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR04341',
      valorReservado: '2.530.961,86',
      mes: 202403
    },
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20240431305',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR06535',
      valorReservado: '1.847.000,00',
      mes: 202405
    },
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20240358063',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR06178',
      valorReservado: '1.027.110,00',
      mes: 202404
    },
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20240327101',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR06147',
      valorReservado: '1.007.323,30',
      mes: 202404
    },
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20240319361',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR05439',
      valorReservado: '985.600,00',
      mes: 202404
    },
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20240326391',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR05616',
      valorReservado: '918.680,00',
      mes: 202404
    },
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20240403365',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR06886',
      valorReservado: '787.082,40',
      mes: 202405
    },
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20240347103',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR06306',
      valorReservado: '722.971,60',
      mes: 202404
    },
    {
      codigoUODocumento: 53055,
      codigoProjetoAtividade: 4860,
      numeroProcesso: '20240411957',
      codigoFonteDetalhada: '150140001',
      codigoNomeElemento: '339030 - MATERIAL DE CONSUMO',
      codigoEvento: 201100,
      numeroNotaReserva: '2024NR07769',
      valorReservado: '633.710,00',
      mes: 202406
    }
  ];

  // Mapeamento de quais células estão em modo de edição
  editingCell: any[] = [];
  originalData: any = {}; // Armazena os valores originais de cada célula

  columns = [
    'codigoUODocumento', 
    'codigoProjetoAtividade', 
    'numeroProcesso', 
    'codigoFonteDetalhada', 
    'codigoNomeElemento', 
    'codigoEvento', 
    'numeroNotaReserva', 
    'valorReservado', 
    'mes'
  ];

  constructor() {
    // Inicializar as células como não editáveis
    this.data.forEach(() => {
      let cellState: { [key: string]: boolean } = {}; // Inicializa com um objeto vazio
      this.columns.forEach(column => {
        cellState[column] = false; // Cada célula começa como não editável
      });
      this.editingCell.push(cellState);
    });
  }

  // Método para iniciar a edição de uma célula
  editCell(rowIndex: number, column: string): void {
    // Armazenar o valor original antes da edição
    if (!this.originalData[rowIndex]) {
      this.originalData[rowIndex] = {};
    }
    this.originalData[rowIndex][column] = this.data[rowIndex][column];

    // Ativa o modo de edição da célula
    this.editingCell[rowIndex][column] = true;
  }

  // Método para salvar a célula editada
  saveCell(rowIndex: number, column: string): void {
    // Desativa o modo de edição
    this.editingCell[rowIndex][column] = false;
    // Remover o valor original, pois a edição foi confirmada
    delete this.originalData[rowIndex][column];
  }

  // Método para cancelar a edição de uma célula e restaurar o valor original
  cancelCell(rowIndex: number, column: string): void {
    // Restaurar o valor original da célula
    this.data[rowIndex][column] = this.originalData[rowIndex][column];
    // Sair do modo de edição
    this.editingCell[rowIndex][column] = false;
    // Remover o valor original armazenado
    delete this.originalData[rowIndex][column];
  }
}
