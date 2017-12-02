import {Component, OnInit} from '@angular/core';
import GitHub from 'github-api';
let CONFIG = require('../../temporary-config.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'TBME CMS';
  token = CONFIG.token;
  content;

  private gh;

  ngOnInit(): void {
    this.gh = new GitHub({
      token: this.token
    });

    const me = this.gh.getUser();
    me.listRepos()
      .then(function({data: reposJson}) {
        console.log(reposJson[0]);
      });

    this.getFileContent();
  }

  getFileContent() {
    let self =this;
    let repo = this.gh.getRepo('mirioeggmann','mirioeggmann.ch');
    repo.getSha('master','about.md')
      .then(function({data: answer}) {
        console.log(answer.sha);
        repo.getBlob(answer.sha).then(function({data: answerBlob}) {
          console.log(answerBlob);
          self.content = answerBlob;
        });
      });
  }

  writeFileContent() {
    let self =this;
    let repo = this.gh.getRepo('mirioeggmann','mirioeggmann.ch');
    let options = {
      encode: true
    };
    repo.writeFile('master','about.md',self.content,'test api', options)
      .then(function({data: answer}) {
        console.log(answer);
      });
  }

}
