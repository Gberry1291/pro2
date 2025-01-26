import { Injectable,inject,signal } from '@angular/core';
import { langdic } from '../board-data/board.state';

@Injectable({providedIn: 'root'})
export class Language {

    public language:langdic={
        "eng":{
            "nav":["Home","Open Games","Rank","Settings","Logout","Login"],
            "home":["New PVP game","opp email","New game vs AI","Send Challenge!","Sign Up to play against other users and build your rank!"],
            "opengames":["VS","Your Move!","Victory","Defeat","Waiting...","Finished"],
            "rank":["LeaderBoard"],
            "settings":["Website Color-Scheme","Simple","Park","Programmer","Army Style","Classical","Japanese","Save","Saving","this should only take a minute","Save Succesful","click to close"],
            "login":["Sign in","Continue with Google","Or","Create/login with us","Login","Create Account"],
            "board":["Undo","Save","Return to start","You have acheived the highest honor a pawn can obtain.","Choose your new life:","Saving","this should only take a minute","Save Succesful","click to close",
            "You Have defeated our AI , but the true challenge awaits","Enter the PVP arena to truly test your skills",
            "a draw is great","try again for a win"]

        },
        "de":{
            "nav":["Heim","Offene Spiele","Rang","Einstellungen","Abmelden","Login"],
            "home":["neues PVP-Spiel","gegner email","neues Spiel gegen KI","Herausforderung senden!","Melden Sie sich an, um gegen andere Benutzer zu spielen und Ihren Rang zu verbessern!"],
            "opengames":["VS","Dein Zug!","Sieg","Verlust","Warten...","Fertig"],
            "rank":["Bestenliste"],
            "settings":["Website-Farbschema","Einfach","Park","Programmierer","Army-Stil","Klassisch","Japanisch","Speichern","Speichern","dies sollte nur eine Minute dauern","Speichern erfolgreich","zum Schließen klicken"],
            "login":["Anmelden", "Weiter mit Google", "Oder", "Mit uns erstellen/anmelden", "Anmelden", "Konto erstellen"],
            "board":["Rückgängig","Speichern","Zurück zum Start","Sie haben die höchste Ehre erreicht, die ein Bauer erhalten kann.","Wählen Sie Ihr neues Leben:","Speichern","dies sollte nur eine Minute dauern","Speichern erfolgreich","zum Schließen klicken",
                "Sie haben unsere KI besiegt, aber die wahre Herausforderung wartet auf Sie","Betreten Sie die PVP-Arena, um Ihre Fähigkeiten auf die Probe zu stellen",
            "ein Unentschieden ist großartig","Versuchen Sie es erneut, um zu gewinnen"
            ]
        },
        "fr":{
            "nav":["Maison","jeux ouverts","Rang","Paramètres","Déconnexion","Se connecter"],
            "home":["Nouveau jeu PvP","E-mail des adversaires","nouveau jeu contre IA","Envoyez le défi !","Inscrivez-vous pour jouer contre d'autres utilisateurs et augmenter votre classement !"],
            "opengames":["Contre","votre déménagement!","victoire","Défaite","en attendant...","Finie"],
            "rank":["Tableau des leaders"],
            "settings":["Schéma de couleurs du site Web", "Simple", "Parc", "Programmeur", "Style militaire", "Classique", "Japonais","Sauvegarder","Enregistrement", "Cela ne devrait prendre qu'une minute", "Enregistrement réussi", "Cliquez pour fermer"],
            "login":["Connexion", "Continuer avec Google", "Ou", "Créer/connecter avec nous", "Connexion", "Créer un compte"],
            "board":["Annuler", "Enregistrer", "Revenir au début", "Vous avez obtenu le plus grand honneur qu'un pion puisse obtenir."," Choisissez votre nouvelle vie :","Sauvegarder","Cela ne devrait prendre qu'une minute", "Enregistrement réussi", "Cliquez pour fermer",
                "Vous avez vaincu notre IA, mais le véritable défi vous attend","Entrez dans l'arène PVP pour vraiment tester vos compétences",
            "un match nul, c'est super","réessayez pour gagner"]
        }
    }

    constructor() {}

    public langdic=signal(this.language["eng"])

    public changelanguage(newlanguage:string){
        this.langdic.set(this.language[newlanguage])
    }
    
}