Collections = {
  companies: new Mongo.Collection("companies")
}
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});

Schema = {};

Schema.Companies = new SimpleSchema({
    name: {
      type: String,
      optional: false
    },
    description: {
      type: String,
      optional: false
    },
    address: {
      type: String,
      optional: false
    },
    photo: {
      type:String,
      optional: true
    },
    location: {
      type: Object,
      optional: true,
    },
    'location.latitude': {
      type: Number,
      optional: true,
      decimal: true
    },
    'location.longitude': {
      type: Number,
      optional: true,
      decimal: true
    },
    size: {
      type: Number,
      optional: false,
      min:0,
      max:4
    }
});

Schema.tagAssociations = new SimpleSchema({
    tags: {
      type:[String],
      optional: false
    },
    score: {
      type:Number,

    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    /*roles: {
        type: Object,
        optional: true,
        blackbox: true
    },*/
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User);
Collections.companies.attachSchema(Schema.Companies);
