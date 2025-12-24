import {DropdownAlertData, DropdownAlertType} from 'react-native-dropdownalert';

interface CustomDropdownAlertData extends DropdownAlertData {
  children?: React.ReactNode;
}

export class Alert {
  static alertObj = (_data: CustomDropdownAlertData) =>
    new Promise<CustomDropdownAlertData>(res => res);

  static getDropDown() {
    return this.alertObj;
  }

  static async showSuccess(message: string) {
    await this.alertObj({
      type: DropdownAlertType.Success,
      title: 'Success',
      message: message,
    });
  }

  static async showError(message: string) {
    await this.alertObj({
      type: DropdownAlertType.Error,
      title: 'Error',
      message: message,
    });
  }

  static async showActivation(children?: React.ReactNode) {
    await this.alertObj({
      type: DropdownAlertType.Success,
      title: 'Success',
      children: children, // Optionally pass custom content
    });
  }
}
