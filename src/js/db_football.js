import * as idb from "./idb";

var dbPromised = idb.open("dbFavorite", 1, (upgradeDb) => {
  var objectStore = upgradeDb.createObjectStore("favorite", {
    keyPath: "id",
  });
  objectStore.createIndex("teamName", "teamName", { unique: false });
});

function addFavorite(data) {
  dbPromised
    .then((db) => {
      var tx = db.transaction("favorite", "readwrite");
      var store = tx.objectStore("favorite");
      var dataSave = {
        id: data.id,
        name: data.name,
        crestUrl: data.crestUrl,
      };
      store.put(dataSave);
      return tx.complete;
    })
    .then(() => {
      console.log("Tim Favorit berhasil disimpan.");
      var message = `${data.name} telah ditambahkan ke daftar favorit`;

      if (Notification.permission === "granted") {
        M.toast({ html: message, classes: "rounded" });
        showNotification(message);
      } else {
        console.error("Fitur notifikasi tidak diijinkan.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteFavorite(data) {
  dbPromised
    .then((db) => {
      var tx = db.transaction("favorite", "readwrite");
      var store = tx.objectStore("favorite");

      store.delete(data.id);
      return tx.complete;
    })
    .then(() => {
      var message = `${data.name} telah dihapus dari daftar favorit`;
      if (Notification.permission === "granted") {
        M.toast({ html: message, classes: "rounded" });
        showNotification(message);
      } else {
        console.error("Fitur notifikasi tidak diijinkan.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getFavData() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then((db) => {
        var tx = db.transaction("favorite", "readonly");
        var store = tx.objectStore("favorite");
        return store.getAll();
      })
      .then((data) => {
        resolve(data);
      });
  });
}

function checkData(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then((db) => {
        var tx = db.transaction("favorite", "readonly");
        var store = tx.objectStore("favorite");
        return store.get(id);
      })
      .then((data) => {
        if (data != undefined) resolve(true);
        else reject(false);
      });
  });
}

function showNotification(body) {
  const title = "Favorite Team";
  const options = {
    body: `${body}`,
    icon: "img/icon-512.png",
    badge: "img/icon-128.png",
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options);
    });
  } else {
    console.error("Fitur notifikasi ditolak.");
  }
}

export { addFavorite, deleteFavorite, getFavData, checkData };
