{{
    config(
        tags=['mart']
    )
}}

WITH

stg_user AS (

    SELECT

        user_ID, user_name, role

    FROM {{ ref('stg_user') }}
),

stg_project AS (

    SELECT

        project_id, project_name

    FROM {{ ref('stg_project') }}

),

stg_timesheet AS (
    SELECT

        *

    FROM {{ ref('stg_timesheet') }}
),


left_join_user_time AS (
    SELECT
        u.*,
        p.*,
        t.activity, t.mon_hrs, t.tue_hrs, t.wed_hrs,  
        t.thur_hrs, t.fri_hrs, t.sat_hrs
    FROM stg_user u
    LEFT JOIN 
        stg_timesheet t ON u.user_ID = t.user_ID
    LEFT JOIN
        stg_project p ON t.project_id = p.project_id
)

SELECT * FROM  left_join_user_time