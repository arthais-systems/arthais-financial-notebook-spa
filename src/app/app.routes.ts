import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { SubmimissionsComponent } from './pages/files/submimissions/submimissions.component';

import { ReservationSchedulesComponent } from './pages/files/reservation-schedules/reservation-schedules.component';
import { CommitmentSchedulesComponent } from './pages/files/commitment-schedules/commitment-schedules.component';
import { CommitmentCashFlowsComponent } from './pages/files/commitment-cash-flows/commitment-cash-flows.component';
import { SettlementCashFlowsComponent } from './pages/files/settlement-cash-flows/settlement-cash-flows.component';

import { MergesComponent } from './pages/files/merges/merges.component';

import { FinancialNotebooksComponent } from './pages/files/financial-notebooks/financial-notebooks.component';

import { ProjectsComponent } from './pages/tables/projects/projects.component';
import { ActivitiesComponent } from './pages/tables/activities/activities.component';
import { ElementsComponent } from './pages/tables/elements/elements.component';
import { ItemsComponent } from './pages/tables/items/items.component';
import { CreditorsComponent } from './pages/tables/creditors/creditors.component';
import { ProcessesComponent } from './pages/tables/processes/processes.component';

import { AuditComponent } from './pages/audit/audit.component';
import { HelpComponent } from './pages/help/help.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Página inicial
    { path: 'home', component: HomeComponent }, // Página inicial
    { path: 'submissions', component: SubmimissionsComponent },
    { path: 'reservation-schedules', component: ReservationSchedulesComponent },
    { path: 'commitment-schedules', component: CommitmentSchedulesComponent },
    { path: 'commitment-cash-flows', component: CommitmentCashFlowsComponent },
    { path: 'settlement-cash-flows', component: SettlementCashFlowsComponent },
    { path: 'merges', component: MergesComponent },
    { path: 'financial-notebooks', component: FinancialNotebooksComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'activities', component: ActivitiesComponent },
    { path: 'elements', component: ElementsComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'creditors', component: CreditorsComponent },
    { path: 'processes', component: ProcessesComponent },
    { path: 'audit', component: AuditComponent },
    { path: 'help', component: HelpComponent },
    { path: 'search-results', component: SearchResultsComponent },
    { path: '**', redirectTo: '' }  // Redirecionar para a página inicial em caso de rota inválida
];
