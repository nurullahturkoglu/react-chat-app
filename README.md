# React ile Online Mesajlaşma Uygulaması

## Projenin içeriği

Bu projenin oluşturulma amacı , kişilerin online olarak birbirine mesaj gönderebilmesi ve alabilmesidir.


## Bu projede hangi framework-library'ler kullanıldı

`React`
`Node.js`
`socket.io`
`mongoose`
`express`
`axios`
`nodemon`
`cors`

## Proje nasıl kurulur
```javascript
npm install
```
```javascript
cd server
npm install
```
```javascript
cd socket
npm install
```
 
## Projede kullanılmış olan özellikler

- Üyelik oluşturma anında daha önce kullanılmış özelliklere(kullanıcı adı, e-posta, telefon numarası) sahip üyelik veritabanında mevcut ise tekrar üyelik oluşturmama

- Üyelik oluşturan her kullanıcıya otomatik avatar ekleme

- Giriş yaparken 'remember me' seçeneği eklenmesi

- Giriş yapılmadan anasayfaya erişimin kısıtlanması

- Giriş yapan kişinin kullanıcı listesinin otomatik olarak listelenmesi

- Database üzerinde bulunan kullanıcının 'username'i ile direkt bağlantı kurabilme (Eklendi)

- Seçilen kullanıcıya anında mesaj gönderme ve alabilme

## Projeye Eklenecek özellikler

- Girişlerin JWT üzerinden token ile alınıp kontrol edilmesi

- Kullanıcın profilini düzenleyebilmesi

- Kullanıcının arkaplanını değiştirebilmesi

- Aktif kullanıcıların listelenebilmesi

## Projeden Görüntüler
### Register
![register](https://user-images.githubusercontent.com/73299153/183383919-3f7307c8-0e41-4d35-bb34-7cf601559707.JPG)

### Login
![login](https://user-images.githubusercontent.com/73299153/183384293-9d4bedeb-7995-43ea-87dd-43fdf4bcf098.JPG)

### Homepage
![homepage](https://user-images.githubusercontent.com/73299153/183384291-fd17015d-6a11-4ba1-9b70-d6ea1abe389b.JPG)

### Conversations
![conversation](https://user-images.githubusercontent.com/73299153/183384288-edd997e8-83a1-4af9-9d07-5a7ca197bc08.JPG)



### Proje hakkında kişisel yorumum

Bu proje staj esnasında reactı öğrenirken tasarladığım ilk büyük çaplı proje.React özelliklerini , server kısmının oluşturulmasını , socket.io'nun bağlanmasını ve mongodb ile veritabanı kullanmasını kavradım. Benim için çok büyük bir adım oldu. Hatalarla yüzleşmeyi , dokümantasyon okumasını , projenin adım adım nasıl geliştirilebileceğini , doğru kaynak aramasını öğrendim.Projeyi oluştururken takip ettiğim [Lama Devoloper](https://www.youtube.com/c/LamaDev) ve staj işyerinde bulunan [Ekrem Abime](https://github.com/ekremtinas) teşekkür ediyorum.

**Not: bu proje react kullanarak yaptığım ilk büyük projedir**  
**Not: projenin geliştirilmesi takribi 10 gün sürmüştür**
