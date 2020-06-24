import {Order} from "../individual-grocery/model/Order";
import {UserDetailsModel} from "../user-details/model/user.details.model";
import {OrderDeliveryStatus} from "../individual-grocery/model/OrderDeliveryStatus";

export class OrderHistoryModel {
  orderedTimestamp: string
  orderHistory: Order[] = []
  orderDeliveryStatus: OrderDeliveryStatus
  orderKey: string

}

export class AdminOrderHistories {
  userId: string
  orderHistory: OrderHistoryModel[] = []
  userDetails: UserDetailsModel
}
