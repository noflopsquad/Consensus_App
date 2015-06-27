CUORE.State = CUORE.Class(null, {
    keys: undefined,
    map: undefined,
    statePersister: undefined,

    init: function(statePersister) {
        this._initialize_in_page();
        this.statePersister = statePersister || CUORE.NullStatePersister();
    },

    hasKey: function(key) {
        return this.keys.indexOf(key) != -1;
    },

    save: function(key, value) {
        if (key === undefined) {
            return;
        }

        if (this._should_be_deleted(value)) {
            this.delete(key);
            return;
        }

        this._save_in_page(key, value);
        this._persist(key, value);
    },

    delete: function(key) {
        this._removeKey(key);
        this.statePersister.remove(key);
    },

    retrieve: function(key) {
        if (!this.hasKey(key)) {
            this._save_in_page(
                key,
                this.statePersister.retrieve(key)
            );
        }
        return this.map[key];
    },

    clear: function() {
        this._initialize_in_page();
    },

    _addKey: function(key) {
        if (this.hasKey(key)) return;
        this.keys.push(key);
    },

    _removeKey: function(key) {
        this.keys.splice(this.keys.indexOf(key), 1);
    },

    _save_in_page: function(key, value) {
        this._addKey(key);
        this.map[key] = value;
    },

    _persist: function(key, value) {
        this.statePersister.save(key, value);
    },

    _should_be_deleted: function(value) {
        return value === undefined || value === null;
    },

    _initialize_in_page: function() {
        this.keys = [];
        this.map = {};
    }
});