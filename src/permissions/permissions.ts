import { rule, shield } from 'graphql-shield';
class Permission {
  // Permissions
  isAllowed = rule()(async (parent, args, ctx, info) => {
    return true;
  });

  permissions = shield({
    Query: {
      companies: this.isAllowed,
      company: this.isAllowed,
      venues: this.isAllowed,
      venue: this.isAllowed,
      menus: this.isAllowed,
      menu: this.isAllowed,
      categories: this.isAllowed,
      category: this.isAllowed,
      assignedCategories: this.isAllowed,
      assignedCategory: this.isAllowed,
      products: this.isAllowed,
      product: this.isAllowed,
      favorites: this.isAllowed,
      favorite: this.isAllowed,
      persons: this.isAllowed,
      person: this.isAllowed,
      productTypes: this.isAllowed,
      productType: this.isAllowed,
      prices: this.isAllowed,
      price: this.isAllowed,
      modifiers: this.isAllowed,
      modifier: this.isAllowed,
      assignedProducts: this.isAllowed,
      assignedProduct: this.isAllowed,
      requests: this.isAllowed,
      request: this.isAllowed,
      orders: this.isAllowed,
      order: this.isAllowed,
      spots: this.isAllowed,
      spot: this.isAllowed,
      customerAssignedSpots: this.isAllowed,
      customerAssignedSpot: this.isAllowed,
      assignedVenues: this.isAllowed,
      assignedVenue: this.isAllowed,
      waiterAssignedSpots: this.isAllowed,
      waiterAssignedSpot: this.isAllowed,
      additionalsPerRequests: this.isAllowed,
      additionalsPerRequest: this.isAllowed,
      orderStatuses: this.isAllowed,
      orderStatus: this.isAllowed,
      modifiersPerRequests: this.isAllowed,
      modifiersPerRequest: this.isAllowed,
      requestStatuses: this.isAllowed,
      requestStatus: this.isAllowed,
      modifierType: this.isAllowed,
      modifierTypes: this.isAllowed
    },
    Mutation: {
      createCompany: this.isAllowed,
      updateCompany: this.isAllowed,
      removeCompany: this.isAllowed,
      createVenue: this.isAllowed,
      updateVenue: this.isAllowed,
      removeVenue: this.isAllowed,
      createMenu: this.isAllowed,
      updateMenu: this.isAllowed,
      removeMenu: this.isAllowed,
      createCategory: this.isAllowed,
      updateCategory: this.isAllowed,
      removeCategory: this.isAllowed,
      assingCategoryToCategoryProduct: this.isAllowed,
      assingCategoriesToMenuProduct: this.isAllowed,
      updateAssignedCategory: this.isAllowed,
      removeAssignedCategory: this.isAllowed,
      createMenuProduct: this.isAllowed,
      createCategoryProduct: this.isAllowed,
      createPureProduct: this.isAllowed,
      createProductAssignedProduct: this.isAllowed,
      updateProduct: this.isAllowed,
      removeProduct: this.isAllowed,
      createFavorite: this.isAllowed,
      updateFavorite: this.isAllowed,
      removeFavorite: this.isAllowed,
      createAdminPerson: this.isAllowed,
      createWaiterPerson: this.isAllowed,
      createCustomerPerson: this.isAllowed,
      sendForgottenPasswordEmail: this.isAllowed,
      changePassword: this.isAllowed,
      updatePerson: this.isAllowed,
      removePerson: this.isAllowed,
      createProductType: this.isAllowed,
      updateProductType: this.isAllowed,
      removeProductType: this.isAllowed,
      createPrice: this.isAllowed,
      updatePrice: this.isAllowed,
      removePrice: this.isAllowed,
      createModifierWithExclusive: this.isAllowed,
      createModifierWithOptional: this.isAllowed,
      updateModifier: this.isAllowed,
      removeModifier: this.isAllowed,
      assingProductToProduct: this.isAllowed,
      updateAssignedProduct: this.isAllowed,
      removeAssignedProduct: this.isAllowed,
      createRequest: this.isAllowed,
      updateRequest: this.isAllowed,
      removeRequest: this.isAllowed,
      createOrder: this.isAllowed,
      updateOrder: this.isAllowed,
      removeOrder: this.isAllowed,
      createSpot: this.isAllowed,
      updateSpot: this.isAllowed,
      removeSpot: this.isAllowed,
      createCustomerAssignedSpot: this.isAllowed,
      updateCustomerAssignedSpot: this.isAllowed,
      removeCustomerAssignedSpot: this.isAllowed,
      createAssignedVenue: this.isAllowed,
      updateAssignedVenue: this.isAllowed,
      removeAssignedVenue: this.isAllowed,
      createWaiterAssignedSpot: this.isAllowed,
      updateWaiterAssignedSpot: this.isAllowed,
      removeWaiterAssignedSpot: this.isAllowed,
      createAdditionalsPerRequest: this.isAllowed,
      updateAdditionalsPerRequest: this.isAllowed,
      removeAdditionalsPerRequest: this.isAllowed,
      createOrderStatus: this.isAllowed,
      updateOrderStatus: this.isAllowed,
      removeOrderStatus: this.isAllowed,
      createModifiersPerRequest: this.isAllowed,
      updateModifiersPerRequest: this.isAllowed,
      removeModifiersPerRequest: this.isAllowed,
      createRequestStatus: this.isAllowed,
      updateRequestStatus: this.isAllowed,
      removeRequestStatus: this.isAllowed,
      createModifierType: this.isAllowed,
      updateModifierType: this.isAllowed,
      removeModifierType: this.isAllowed
    }
  },
  {
    allowExternalErrors: true
  });
}

export const permission: Permission = new Permission();
