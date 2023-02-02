import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EquiposComponent } from "./equipos/equipos.component";
import { HistorialComponent } from "./historial/historial.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";


const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          {path: '', component: DashboardComponent},
          {path: 'historial', component: HistorialComponent},
          {path: 'usuarios', component: UsuariosComponent},
          {path: 'equipos', component: EquiposComponent}
        ]
    },
]

@NgModule({
 imports:[RouterModule.forChild(routes)],
 exports:[RouterModule]

})
export class PagesRoutingModule {}