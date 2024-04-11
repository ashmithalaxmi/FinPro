{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT
        CAST(id AS INT) AS user_ID ,
        CAST(PID AS INT) AS project_id,
        ACTIVITY AS activity,
        COMMENTS,
        TO_DATE(START_PERIOD, 'DD-MM-YYYY') AS project_start,
        TO_DATE(END_PERIOD, 'DD-MM-YYYY') AS project_end,
        CAST(MON AS INT) AS mon_hrs,
        CAST(TUE AS INT) AS tue_hrs,
        CAST(WED AS INT) AS wed_hrs,
        CAST(THUR AS INT) AS thur_hrs,
        CAST(FRI AS INT) AS fri_hrs,
        CAST(SAT AS INT) AS sat_hrs,
        CAST(SUN AS INT) AS sun_hrs,
        VISIBLE AS  visible
    FROM {{ source('TF_SYSTEM', 'TIMESHEET') }}

)


SELECT * FROM required_fields