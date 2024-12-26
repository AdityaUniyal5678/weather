import { inject, Injectable } from '@angular/core';
import { first, map, switchMap } from 'rxjs/operators';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

interface User {
  email: string;
  uid: string;
}

function isUser(value: unknown): value is User {
  return !!value && typeof value === 'object' && 'uid' in value && 'email' in value;
}

interface City {
  name: string;
  added: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FbService {
  user$: Observable<string>;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.user$ = user(this.auth).pipe(map(u => (u ? u.uid : '')));
  }

  userEmail(): Observable<string | null> {
    return user(this.auth).pipe(map(x => (isUser(x) ? x.email : null)));
  }

  isAuth() {
    return user(this.auth).pipe(map(x => !!x));
  }

  signin(email: string, pass: string) {
    return from(signInWithEmailAndPassword(this.auth, email, pass));
  }

  signup(email: string, pass: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, pass));
  }

  signout() {
    return from(signOut(this.auth));
  }

  getCities() {
    return this.user$.pipe(
      switchMap((uid: string) =>
        collectionData(collection(this.firestore, 'cities')).pipe(
          map(cities =>
            cities.map(
              city =>
                ({
                  name: city['name'],
                  added: city['added'],
                  ...city,
                }) as City
            )
          )
        )
      )
    );
  }

  addCity(name: string) {
    return user(this.auth).pipe(
      map(x => (x as User).uid),
      switchMap(uid =>
        addDoc(collection(this.firestore, `${uid}`), {
          name,
          added: new Date().toISOString(),
        })
      ),
      first()
    );
  }
}
