const { Controller } = require("../modules");
const { Setting } = require("@explorer/common/databases/admin");
const AccessControl = require("../middleware/AccessControl");

module.exports = class SettingController extends Controller {
  constructor() {
    super(AccessControl);
  }

  saveSettings(req, res, next) {
    Setting.find({}, (err, settings) => {
      if (err) {
        next(err);
      }

      let setting = {};

      if (settings.length > 0) {
        setting = settings[0];
      } else {
        setting = new Setting();
      }

      setting.allowUserRegistration = req.body.allowUserRegistration;
      setting.allowUserConfirmation = req.body.allowUserConfirmation;
      setting.allowUserInvitation = req.body.allowUserInvitation;
      setting.logoutUserAfterMinutesOfInactivity =
        req.body.logoutUserAfterMinutesOfInactivity;
      setting.deactivateUserAfterDaysOfInactivity =
        req.body.deactivateUserAfterDaysOfInactivity;
      setting.save(err2 => this.handleResponse(res, next, err2, setting));
    });
  }

  getSettings(req, res, next) {
    Setting.find({}, (err, settings) => {
      if (err) {
        next(err);
      }

      let setting = {};

      if (settings.length > 0) {
        setting = settings[0];
      } else {
        setting = new Setting();
        setting.save();
      }
      this.handleResponse(res, next, err, setting);
    });
  }
};
