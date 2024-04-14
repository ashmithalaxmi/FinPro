{{
    config(
         ---tags to refer the staging layer
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT 
        --- casting of necessary features and following naming conventions
        CAST(ID AS INT) AS user_ID,
        CAST(PID AS INT) AS project_id,
        TO_DATE(ALLOCATION_START, 'DD-MM-YYYY') AS allocation_start,
        TO_DATE(ALLOCATION_END, 'DD-MM-YYYY') AS allocation_end,
    FROM {{ source('TF_SYSTEM', 'PROJECTASSIGN') }}

)


SELECT * FROM required_fields