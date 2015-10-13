Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {
        path: "/home/lukasz/praca_inzynierska/pracaInzynierska/uploads"
    })]
});