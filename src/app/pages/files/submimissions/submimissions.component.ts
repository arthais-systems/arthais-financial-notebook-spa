import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Submission {
  submissionId: number;
  description: string;
  user: string;
  userPhotoUrl: string; // Adicionando o campo para a URL da foto do usuário
  timestamp: string;
  status: string;
  files: string[];
}

@Component({
  selector: 'app-submimissions',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './submimissions.component.html',
  styleUrls: ['./submimissions.component.css']
})
export class SubmimissionsComponent {
  description = '';
  files: (File | null)[] = [null, null, null, null]; // Quatro arquivos para submissão
  uploadProgress: number[] = [-1, -1, -1, -1]; // Progressos de upload para cada arquivo
  submissionSuccess = false; // Indica se a submissão foi bem-sucedida
  finalStatus = 'Sucesso'; // Status final da submissão: Sucesso, Erros, Alertas
  showForm = false; // Controla se o formulário de submissão está visível
  showFilter = false; // Controla se o filtro está visível
  userFilter = ''; // Adicionando o filtro por usuário
  statusFilter = ''; // Filtro por status
  dateFrom: string | null = null; // Filtro de data inicial
  dateTo: string | null = null; // Filtro de data final
  isProcessing = false; // Indica se o processamento está em andamento
  currentStep = 0; // Etapa atual do processo de submissão
  processLog = ''; // Log de progresso do processo de submissão
  sortColumn: string | null = 'timestamp'; // Iniciar com a coluna de data
  sortOrder: 'asc' | 'desc' = 'desc'; // Iniciar com a ordenação descendente

  // Lista de usuários simulada para o filtro
  users: string[] = ['Carlos Silva', 'Ana Oliveira', 'João Souza', 'Raimundo Santo'];

  // Massa de dados fake de submissões
  // Massa de dados fake de submissões com a URL da foto
  submissions: Submission[] = [
    {
      submissionId: 1,
      description: 'Submissão de Outubro/2023',
      user: 'Carlos Silva',
      userPhotoUrl: 'avatars/carlos-silva.png',
      timestamp: '2023-10-01 10:00:00',
      status: 'Sucesso',
      files: ['Cronograma de Reserva.xlsx', 'Cronograma de Empenho.xlsx', 'Fluxo Caixa Empenho.xlsx', 'Fluxo Caixa Liquidação.xlsx']
    },
    {
      submissionId: 2,
      description: 'Submissão de Novembro/2023',
      user: 'Ana Oliveira',
      userPhotoUrl: 'avatars/ana-oliveira.png',
      timestamp: '2023-11-05 14:30:00',
      status: 'Erros',
      files: ['Cronograma de Reserva.xlsx', 'Cronograma de Empenho.xlsx', 'Fluxo Caixa Empenho.xlsx', 'Fluxo Caixa Liquidação.xlsx']
    },
    {
      submissionId: 3,
      description: 'Submissão de Dezembro/2023',
      user: 'João Souza',
      userPhotoUrl: 'avatars/joao-souza.png',
      timestamp: '2023-12-01 09:15:00',
      status: 'Alertas',
      files: ['Cronograma de Reserva.xlsx', 'Cronograma de Empenho.xlsx', 'Fluxo Caixa Empenho.xlsx', 'Fluxo Caixa Liquidação.xlsx']
    }
  ];

  // Filter

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.showFilter = false; // Esconde o filtro quando o formulário estiver aberto
    } else {
      this.showFilter = true;  // Exibe o filtro quando o formulário estiver fechado
    }
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill';
    }
    return 'bi bi-sort';
  }

  // Filtra as submissões com base nos filtros de usuário, status, e data
  filteredSubmissions(): Submission[] {
    return this.submissions.filter(submission => {
      const userCondition = !this.userFilter || submission.user === this.userFilter;
      const statusCondition = !this.statusFilter || submission.status === this.statusFilter;
      const dateCondition = (!this.dateFrom || submission.timestamp >= `${this.dateFrom} 00:00:00`) &&
        (!this.dateTo || submission.timestamp <= `${this.dateTo} 23:59:59`);
      return userCondition && statusCondition && dateCondition;
    }).sort((a, b) => this.compare(a, b));
  }

  // Comparar os dados com base na coluna e na ordem de classificação
  compare(a: Submission, b: Submission): number {
    const valueA = a[this.sortColumn as keyof Submission];
    const valueB = b[this.sortColumn as keyof Submission];

    // Verifique se é timestamp e converta as datas para garantir uma comparação correta
    if (this.sortColumn === 'timestamp') {
      const dateA = new Date(valueA as string).getTime();
      const dateB = new Date(valueB as string).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }

    // Comparação padrão para outras colunas
    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }
    return this.sortOrder === 'asc' ? comparison : -comparison;
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
  }

  deleteSubmission(id: number): void {
    this.submissions = this.submissions.filter(submission => submission.submissionId !== id);
    localStorage.removeItem(id.toString());
  }

  // Form

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.files[index - 1] = input.files[0]; // Armazena o arquivo selecionado no índice correto
      // Não alterar o progresso aqui, apenas armazenar o arquivo
    }
  }

  allFilesSelected(): boolean {
    return this.files.every(file => file !== null) && this.description.trim().length > 0;
  }

  clearFile(index: number, fileInput: HTMLInputElement): void {
    this.files[index - 1] = null; // Remove o arquivo selecionado
    this.uploadProgress[index - 1] = -1; // Reseta o progresso do upload
    fileInput.value = ''; // Limpa o valor do input de arquivo
  }






  submitFiles(): void {
    this.isProcessing = true;
    this.currentStep = 1;
    this.processLog = 'Iniciando upload das planilhas...\n';
    
    // Barra de progresso de passos - Envio dos arquivos ao servidor começa no passo 1
    this.startUpload();
  }

  startUpload(): void {
    let uploadCompleted = false;
  
    // Simular o upload com um intervalo para aumentar o progresso gradualmente
    const interval = setInterval(() => {
      uploadCompleted = true;
  
      // Itera sobre cada arquivo e atualiza o progresso
      this.files.forEach((file, index) => {
        if (file && this.uploadProgress[index] < 100) {
          this.uploadProgress[index] += 10; // Incrementa o progresso
          if (this.uploadProgress[index] >= 100) {
            this.uploadProgress[index] = 100; // Certifica que não ultrapassa 100%
          }
          uploadCompleted = false;
        }
      });
  
      // Quando todos os uploads estiverem completos, prossegue
      if (uploadCompleted) {
        clearInterval(interval);
        this.processLog += 'Upload das planilhas concluído.\n';
        this.currentStep = 2; // Passo 2 - Envio dos arquivos ao servidor
    
        // Após o upload, chama a validação no "back-end"
        this.validateFiles();
      }
    }, 500); // Atualiza o progresso a cada meio segundo
  }

  validateFiles(): void {
    this.processLog += 'Enviando arquivos para validação no back-end...\n';
    this.currentStep = 3; // Passo 3 - Validação
  
    // Simular tempo de resposta do back-end para validação
    setTimeout(() => {
      const hasErrors = Math.random() > 0.7;
      const hasAlerts = !hasErrors && Math.random() > 0.5;
  
      if (hasErrors) {
        this.processLog += 'Validação falhou: Erros encontrados no back-end.\n';
        this.finalStatus = 'Erros';
      } else if (hasAlerts) {
        this.processLog += 'Validação retornou alertas do back-end.\n';
        this.finalStatus = 'Alertas';
      } else {
        this.processLog += 'Validação bem-sucedida: Nenhum erro ou alerta encontrado.\n';
        this.finalStatus = 'Sucesso';
      }
  
      this.generateLogs();  // Geração de logs de erros ou alertas (ou sucesso)
    }, 3000); // Simula um tempo de 3 segundos para a "validação no back-end"
  }
  
  generateLogs(): void {
    this.processLog += 'Gerando relatório de logs...\n';
    this.currentStep = 4; // Passo 4 - Geração de logs
  
    // Gera logs independente de erros, alertas ou sucesso
    setTimeout(() => {
      this.processLog += 'Relatório de logs gerado com sucesso.\n';
      this.mergeFiles();  // Após geração dos logs, inicia a mesclagem dos arquivos
    }, 2000);
  }
  
  mergeFiles(): void {
    this.processLog += 'Iniciando a mesclagem dos arquivos...\n';
    this.currentStep = 5; // Passo 5 - Mesclagem
  
    // Simular o processo de mesclagem dos arquivos
    setTimeout(() => {
      this.processLog += 'Mesclagem dos arquivos concluída com sucesso.\n';
      this.persistData();  // Após a mesclagem, persiste os dados no banco
    }, 2000); // Simulando o tempo de mesclagem
  }
  
  persistData(): void {
    this.processLog += 'Persistindo os dados no banco...\n';
    this.currentStep = 6; // Passo 6 - Persistência no banco
  
    // Simular persistência dos dados no banco de dados
    setTimeout(() => {
      this.processLog += 'Dados persistidos no banco com sucesso.\n';
      this.ingestData();  // Após persistir os dados, realiza a ingestão no banco dimensional
    }, 2000); // Simulando o tempo de persistência
  }
  
  ingestData(): void {
    this.processLog += 'Iniciando a ingestão dos dados no banco dimensional...\n';
    this.currentStep = 7; // Passo 7 - Ingestão no banco dimensional
  
    // Simular ingestão dos dados
    setTimeout(() => {
      this.processLog += 'Ingestão dos dados no banco dimensional concluída com sucesso.\n';
      this.finalizeProcess();  // Após a ingestão, finaliza o processo
    }, 2000); // Simulando o tempo de ingestão
  }
  
  finalizeProcess(): void {
    this.processLog += 'Finalizando o processo de submissão...\n';
    this.currentStep = 8; // Passo 8 - Finalização
  
    // Simular a finalização e a criação de uma nova submissão
    setTimeout(() => {
      //this.isProcessing = false;
      this.submissionSuccess = true;
      const submissionId = 4; // Simula a sequência dos IDs.
      const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  
      // Criando a nova submissão
      const newSubmission: Submission = {
        submissionId,
        description: this.description,
        user: 'Raimundo Santo', // Usuário autenticado (simulado)
        userPhotoUrl: 'avatars/raimundo-santo.png', // URL da foto do usuário (simulado)
        timestamp,
        status: this.finalStatus,
        files: this.files.map(file => (file ? file.name : 'Nenhum arquivo selecionado'))
      };
  
      this.submissions.push(newSubmission);
      localStorage.setItem(submissionId.toString(), JSON.stringify(newSubmission));
  
      this.processLog += `Submissão finalizada com status: ${this.finalStatus}.\n`;
    }, 2000); // Simulando o tempo de finalização
  }

}
