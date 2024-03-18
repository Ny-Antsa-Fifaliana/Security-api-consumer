import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRole } from 'src/app/models/AppRole.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent  implements OnInit{

  FormRole_update!: FormGroup;
  newAppRole!: AppRole;
  ancienNomAppRole!: string;
  id!: number;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.iniForm();
    const ancienNomAppRole= this.route.snapshot.params['roleName'];
    const id= this.route.snapshot.params['id'];

    this.ancienNomAppRole=ancienNomAppRole;
    this.id=id;
  }

  iniForm() {
    this.FormRole_update=this.formBuilder.group({
      roleName: ['', Validators.required]
    });
  }

  onUpdateRole(){
    const newNomRole= this.FormRole_update.get('roleName')?.value;
    const newAppRole= new AppRole(newNomRole);
    newAppRole.setId(this.id);

    this.authService.UpdateRole(newAppRole).subscribe({
      next:(data)=>{
      this.newAppRole=data;
      if(data.body!=null){
        if(data.message.includes("Existe")){
          this.popupError(data.message);
        }
        else if(data.message.includes("Modifié")){
          this.router.navigate(['/security/account']);
          this.ReconnectWarning();
        }
      }
      else{
        this.popupError(data.message);
      }
      },
      error:(err)=>{
        //  this.popupError(data.message);
      }
    });
  }

  popupError(message: string){
    Swal.fire(" Erreur!", message, "warning");
  }

  popup(message:string){
    Swal.fire(" Modification", message, "success");
  }

  public ReconnectWarning(){
     Swal.fire(
    'Mise à jour du profil Utilisateur',
    ' Modifié avec succès! Info: les modifications du profil seront prise en charge après reconnection de l\'utilisateur! ',
    'success'
  )

  }
}
