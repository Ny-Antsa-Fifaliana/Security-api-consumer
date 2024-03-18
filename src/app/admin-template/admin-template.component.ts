import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppUser } from '../models/AppUser.model';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss']
})
export class AdminTemplateComponent implements OnInit {

  principale: AppUser={} as AppUser;
  panelOpenState = false;

  FormUser_updateName!: FormGroup;
  newAppUserName!: AppUser;
  ancienNomAppUser!: string;

  FormUser_updatePassword!: FormGroup;
  newAppUserPassword!: AppUser;
  ancienPasswordAppUser!: string;
  

  constructor(public authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) { 
              }

  ngOnInit(): void {
    this.initFormUserName();
    this.initFormPassword();
    this.authService.refreshSubject$.subscribe(()=>{
      this.reloadPrincipale();
    })
    
    this.reloadPrincipale();
    
    
  }



  reloadPrincipale(){
    this.authService.getLocalUserProfile().subscribe(data=>{
     
      if(data){
        this.principale=JSON.parse(data);  
      }
    });
  } 



    status: boolean = false;
    clickEvent(){
      this.status = !this.status;       
    }

    initFormUserName() {
      this.FormUser_updateName=this.formBuilder.group({
        userName: ['', Validators.required],
        userNameConfirm: ['', Validators.required]
      });
    }

    initFormPassword() {
      this.FormUser_updatePassword=this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      });
    }


    onUpdateUserName(){
      const newNomUser= this.FormUser_updateName.get('userName')?.value;
      const newAppUser= new AppUser(newNomUser,'');
      newAppUser.setId(this.principale.id);
  
      this.authService.UpdateUser(newAppUser).subscribe({
        next:(data)=>{
        this.newAppUserName=data;
        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("Modifié")){
            this.popup(data.message);
            this.FormUser_updateName.reset();
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
      Swal.fire({
        title: 'Mise à jour du profil',
        text: "Veuillez vous reconnecter pour que les modification soit prise en charge !",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor:'#d33',
        cancelButtonColor:  '#3085d6',
        cancelButtonText: 'pas maintenant',
        confirmButtonText: 'reconnecter'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.logout();
          this.router.navigate(['/login']);
          Swal.fire(
            'Mise à jour du profil',
            ' la modification de votre profil a été effectué avec succès!',
            'success'
          )
        }
       
      })
  
    }



    onUpdateUserPassword(){
      const newMdpUser= this.FormUser_updatePassword.get('password')?.value;
      const newAppUser= new AppUser('',newMdpUser);
      newAppUser.setId(this.principale.id);
  
      this.authService.UpdateMdpUser(newAppUser).subscribe({
        next:(data)=>{
        this.newAppUserPassword=data;
        if(data.body!=null){
          if(data.message.includes("Existe")){
            this.popupError(data.message);
          }
          else if(data.message.includes("Modifié")){
            this.popup(data.message);
            this.FormUser_updatePassword.reset();
            this.ReconnectMdpWarning();
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

    public ReconnectMdpWarning(){
      Swal.fire({
        title: 'Mise à jour du mot de passe utilisateur',
        text: "Veuillez vous reconnecter pour que les modification soit prise en charge !",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor:'#d33',
        cancelButtonColor:  '#3085d6',
        cancelButtonText: 'pas maintenant',
        confirmButtonText: 'reconnecter'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.logout();
          this.router.navigate(['/login']);
          Swal.fire(
            'Changement de mot de passe',
            ' la modification de votre profil a été effectué avec succès!',
            'success'
          )
        }
       
      })
  
    }

    
  public logoutWarning(){
    Swal.fire({
      title: 'Déconnexion ?',
      text: "Souhaitez-vous vraiment vous déconnecter ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:  '#3085d6',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
       
      }
    })
  }



}
