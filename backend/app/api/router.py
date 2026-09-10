from fastapi import APIRouter

from app.api.v1 import (
    abs_compliance,
    admin,
    appointments,
    auth,
    chat,
    consent,
    dashboard,
    doctors,
    documents,
    drug_classification,
    formulation,
    health,
    notifications,
    orders,
    prescriptions,
    products,
    records,
    regimes,
    saved_answers,
    sources,
    tkdl,
    translate,
    users,
)

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router)
api_router.include_router(chat.router)
api_router.include_router(formulation.router)
api_router.include_router(drug_classification.router)
api_router.include_router(abs_compliance.router)
api_router.include_router(tkdl.router)
api_router.include_router(regimes.router)
api_router.include_router(sources.router)
api_router.include_router(saved_answers.router)
api_router.include_router(dashboard.router)
api_router.include_router(notifications.router)
api_router.include_router(doctors.router)
api_router.include_router(appointments.router)
api_router.include_router(prescriptions.router)
api_router.include_router(products.router)
api_router.include_router(orders.router)
api_router.include_router(records.router)
api_router.include_router(translate.router)
api_router.include_router(users.router)
api_router.include_router(documents.router)
api_router.include_router(consent.router)
api_router.include_router(admin.router)
