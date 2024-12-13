const { Schema, model, Types } = require("mongoose");

const connectionRequestSchema = new Schema({
  fromId: {
    type: Types.ObjectId,
    required: true,
  },
  toId: {
    type: Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ['accepted', 'rejected', 'pass', 'like'],
      message: '{VALUE} is not allowed as status',
    },
  },
});

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if (connectionRequest.fromId.equals(connectionRequest.toId)) {
    return next(new Error("Connection Request to own is not allowed"));
  }

  next();
});

connectionRequestSchema.index({ fromId: 1, toId: 1 });

const ConnectionRequest = model("ConnectionRequest", connectionRequestSchema);

module.exports = { ConnectionRequest };
